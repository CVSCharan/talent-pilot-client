import React from "react";
import { Helmet } from "react-helmet-async";

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <>
      <Helmet>
        <title>{title} | TalentPilot</title>
        {description && <meta name="description" content={description} />}
      </Helmet>
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="text-muted-foreground">{description}</p>
        )}
        {children}
      </div>
    </>
  );
}