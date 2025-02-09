import React from 'react';
import { RoleSelector } from './RoleSelector';
import { useUserRole } from '../../hooks/useUserRole';
import { UserRole } from '../../constants/roles';

interface LoginFormProps {
  onSuccess: () => void;
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const { setRole } = useUserRole();

  const handleRoleSelect = (role: UserRole) => {
    setRole(role);
    onSuccess();
  };

  return (
    <div className="space-y-4">
      <RoleSelector onRoleSelect={handleRoleSelect} />
    </div>
  );
}