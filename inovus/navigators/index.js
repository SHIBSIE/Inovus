import React from 'react';

import { AuthenticatedUserProvider } from './AuthenticatedUserProvider';
import RootStack from './RootStack';

/**
 * Wrap all providers here
 */

export default function Routes() {
  return (
    <AuthenticatedUserProvider>
      <RootStack />
    </AuthenticatedUserProvider>
  );
}