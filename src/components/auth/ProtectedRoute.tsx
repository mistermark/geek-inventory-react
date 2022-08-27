import { ComponentType } from 'react';
import { withAuthenticationRequired } from '@auth0/auth0-react';

type ProtectedRouteProps = {
  component: ComponentType;
};
export const ProtectedRoute = ({ component, ...args }: ProtectedRouteProps) => {
  const Component = withAuthenticationRequired(component, args);
  return <Component />;
};
