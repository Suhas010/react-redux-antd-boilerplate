/* eslint-disable no-restricted-syntax,no-prototype-builtins,no-use-before-define */
import {
  deleteAllInstances, deleteInstance, saveAllInstances, saveInstance, saveLast,
} from '../actions';
import { INVALID_INSTANCE_CANNOT_SAVE } from '../utils/constant';
import store from '../store/store';
import { contains, isEmpty } from '../utils/commonFunctions';

/**
 * Parent class for models. Exposes all the model layer functionalities to it's corresponding children.
 * @param P type definition for the properties to be stored within the Model class.
 */

/**
 * Generates a map of instances such that the key is store key of an instance and the value
 * is the instance itself. Used in the saveAll method.
 * @param instances The list of instances whose map is to be generated.
 */
function generateInstanceMap(instances) {
  if (isEmpty(instances)) {
    return null;
  }

  const instanceMap = {};

  instances.forEach((instance) => {
    if (!(instance instanceof BaseModel)) {
      throw new Error(INVALID_INSTANCE_CANNOT_SAVE(instance));
    }
    instanceMap[instance.getStoreKey()] = instance;
  });

  return instanceMap;
}

/**
* Used the validate an object to the set of rules passed in
* @param obj The Object to be validated.
* @param rules The set of constraint functions which need to be applied to the object properties.
* @returns boolean representing whether or not the obj passes the rules.
*/

function validateObject(obj, rules) {
  for (const prop in rules) {
    if (rules.hasOwnProperty(prop)) {
      const constraint = rules[prop];
      if (!constraint(obj[prop])) {
        return false;
      }
    }
  }

  return true;
}

export default class BaseModel {
  static resource;
  resource;
  static constraints;
  static defaultProps;
  static embedded;

  /** Performs all initialization and validation related operations of the properties passed in. */
  constructor(props) {
    if (!this.validate()) {
      throw new Error(this.constructor.name);
    }
    this.assignDefaults();
    this.resource = this.constructor.resource;
    this.props = props;
  }

  /**
   * Saves all the embedded properties which are instances of models in a cascading manner
   * and sets the value of the corresponding key as the ids of the saved models;
   */
  embeddedSave() {
    const { embedded } = this.constructor;
    if (isEmpty(embedded)) {
      return;
    }

    const save = (val) => {
      if (val instanceof BaseModel) {
        const { props: { id }, constructor: { get } } = val;
        if (val !== get(id)) {
          val.$save();
          return val.props.id;
        }
      }
      return null;
    };

    embedded.forEach((key) => {
      const currentValue = this[key];
      if (currentValue instanceof Array) {
        this[key] = currentValue.map((val) => {
          return save(val);
        });
        return;
      }
      this[key] = save(currentValue);
    });
  }

  /**
   * Deletes all embedded domain instances in a cascading manner if the parameter cascade is true
   * @param cascade Used to toggle cascading delete.
   */
  embeddedDelete(cascade = true) {
    const { embedded } = this.constructor;
    if (isEmpty(embedded)) {
      return;
    }

    const del = (val) => {
      if (val instanceof BaseModel) {
        val.$delete();
      }
    };

    embedded.forEach((key) => {
      const currentValue = this[key];
      if (cascade) {
        if (currentValue instanceof Array) {
          currentValue.forEach((val) => {
            del(val);
          });
          return;
        }
        del(currentValue);
      }
    });
  }

  /**
   * Checks whether there are any default values defined for any of the properties and if yes
   * assigns these values to the corresponding properties in case they are undefined at the
   * time of initialization.
   */
  assignDefaults() {
    const defaultProps = this.constructor.defaultProps;
    if (!defaultProps) {
      return;
    }
    keys(defaultProps, (key) => {
      if (isEmpty(this.props[key])) {
        this.props[key] = defaultProps[key];
      }
    });
  }

  /**
   * Returns the value of the key to which the current instance needs to be assigned to in the store.
   * @returns String representing the key for the current instance in the store.
   */
  getStoreKey() {
    return `${this.resource}${(this.props).id}`;
  }

  /**
   * Used to propagate the changes in the properties to the instance saved in the store.
   * @param identifier A custom string to be attached to the SAVE_INSTANCE which can be used
   * to mention the reason behind calling the save function. Used for debugging the code using the
   * redux dev tools.
   * @returns The updated version of the instance.
   */
  $save(identifier = '') {
    if (!this.validate()) {
      throw new Error(this.constructor.name);
    }
    this.embeddedSave();
    saveInstance(this, this.getStoreKey(), identifier);
    return this;
  }

  /** Removes the current instance from the store. */
  $delete(cascade = true) {
    this.embeddedDelete(cascade);
    deleteInstance(this, this.getStoreKey());
  }

  /**
   * Used to verify whether or not the properties passed into the instance
   * pass the specified constraints. Used at the time of initialization and while calling save methods.
   * @returns boolean specifying whether or not the properties pass the constraints.
   */
  validate() {
    const constraints = this.constructor.constraints;

    if (isEmpty(constraints)) {
      return true;
    }

    return validateObject(this.props, constraints);
  }

  /**
   * Used to fetch an instance from the store.
   * @param id ID of the instance to be fetched.
   * @param state Optional state of the redux store from which the instance is to be fetched.
   * Used majorly in the mapStateToProps functions so as to avoid an unused instance of the state in the function.
   * @returns an instance of the current model instance.
   */
  static get(id, state = store.getState()) {
    const modelState = state.models;

    if (!modelState) {
      return null;
    }

    const storeKey = `${this.resource}${id}`;
    return modelState.toJS ? modelState.get(storeKey) : modelState[storeKey];
  }

  /**
   * Used to fetch multiple instances from the store.
   * @param ids the list of ids of the instances which need to be fetched.
   * @returns a list of all the instances found in the store.
   */
  static getAll(ids) {
    if (isEmpty(ids)) {
      return [];
    }
    const instances = this.list();
    return instances.filter(instance => contains(ids, instance.props.id));
  }

  /**
   * Used to fetch the list of all instances present in the store.
   * @param state Optional state of the redux store from which the instances is to be fetched.
   * Used majorly in the mapStateToProps functions so as to avoid an unused instance of the state in the function.
   * @returns Array of instances.
   */
  static list(state = store.getState()) {
    return state.models.filter((instance) => {
      return instance && instance.resource === this.resource;
    }).toArray();
  }

  /** Returns the last instance which had been stored in the redux store. */
  static last() {
    const modelState = store.getState().models;
    if (isEmpty(modelState)) {
      return null;
    }

    return modelState.findLast(instance => instance.resource === this.resource);
  }

  /**
   * Used to remove instances which were not created on the list page.
   * This is so that, the list pages are not populated with inconsistent instances and the start_id required for
   * the list request is not incorrect.
   */
  static removeStaleInstances() {
    const list = this.list();

    if (isEmpty(list)) {
      return;
    }

    const lastPageInstance = this.getLastPageInstance();
    /*
       * This if block is used to handle the situation wherein instances have been fetched and constructed
       * on some page other than the list page. In such a case the list will be prepopulated with
       * stale instances.
       */
    if (!lastPageInstance && !isEmpty(list)) {
      this.deleteAll();
      return;
    }

    const lastInstance = list[list.length - 1];
    if (list.indexOf(lastInstance) === list.indexOf(lastPageInstance)) {
      return;
    }

    this.deleteAll(list.splice(list.indexOf(lastPageInstance)));
  }

  /**
   * Used to save the latest instance received in the list request on either of the listing pages.
   * @param instance The instance to be marked as the last instance on the listing page.
   */
  static saveLastPageInstance(instance) {
    saveLast(instance);
  }

  /**
   * Used to fetch the latest instance stored on the listing page.
   * @returns The corresponding model instance.
   */
  static getLastPageInstance() {
    const state = store.getState();
    const instanceID = state.last.get(this.resource);
    if (!instanceID) {
      return null;
    }
    return this.get(instanceID, state);
  }

  /**
   * Used to propagate changes in multiple instances to the store
   * @param T Specifies the model class whose instances are being saved.
   * @param instances The list of instances whose changes are being propagated to the store.
   */
  static saveAll(instances) {
    for (const instance of instances) {
      if (!validateObject(instance, this.constraints)) {
        throw new Error(this.constructor.name);
      }
    }
    saveAllInstances(generateInstanceMap(instances));
  }

  /**
   * Used to remove multiple model instances from the store.
   * @param T The model class whose instances are being removed.
   * @param instances The instances which need to be removed from the store.
   */
  static deleteAll(instances = this.list()) {
    deleteAllInstances(instances.map((instance) => {
      return instance[1].getStoreKey();
    }));
  }
}
