function canAccess(permissions) {
  return permissions.includes('1');
}

const AcceccCheck = ({
  children,
  permissions,
}) => {
  if (canAccess(permissions)) {
    return children;
  }
  return null;
};

export default AcceccCheck;

