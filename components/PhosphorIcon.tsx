'use client';
import * as Icons from '@phosphor-icons/react';
import type { IconProps } from '@phosphor-icons/react';

type IconName = keyof typeof Icons;

export default function PhosphorIcon({ name, ...props }: { name: IconName } & IconProps) {
  const Icon = Icons[name] as React.ComponentType<IconProps>;
  return <Icon {...props} />;
}
