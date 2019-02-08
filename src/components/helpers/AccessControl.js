import { connect } from 'react-redux';
import UserModel from '../../models/AppModel/UserModel';

const getUserPermisiions = ({ role }) => {
  if (!role) {
    return false;
  }
  return role.permissions;
};

function isPermitted(user, needPermission) {
  const allowedPermissions = getUserPermisiions(user);
  if (!allowedPermissions) {
    return false;
  }
  return allowedPermissions.find(item => item.name === needPermission);
}

const AccessControl = ({
  user,
  children,
  requirePermission,
}) => {

  if (isPermitted(user, requirePermission)) {
    return children;
  }
  return null;
};

AccessControl.defaultProps = {
  requirePermission: [],
  user: [],
  renderNoAccess: () => null,
};

function mapStateToProps() {
  return {
    user: UserModel.list()[0] && UserModel.list()[0][1].props,
  };
}

export default connect(mapStateToProps)(AccessControl);
