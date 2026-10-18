import React from "react";

export type ContainerVariant = "wide" | "standard" | "narrow" | "fluid" | "focused";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: ContainerVariant;
  as?: React.ElementType;
  className?: string;
}

export function Container({
  children,
  variant = "standard",
  as: Component = "div",
  className = "",
  ...props
}: ContainerProps) {
  const variantClass = {
    wide: "container-wide",
    standard: "container-standard",
    narrow: "container-narrow",
    fluid: "container-fluid",
    focused: "container-focused",
  }[variant];

  return (
    <Component className={`${variantClass} ${className}`.trim()} {...props}>
      {children}
    </Component>
  );
}
