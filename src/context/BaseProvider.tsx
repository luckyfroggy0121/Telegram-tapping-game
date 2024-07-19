import React from "react";
import UserProvider from "./UserProvider";

type BaseProviderProps = {
  children: React.ReactNode;
};

const providers = [UserProvider];

const BaseProvider = (props: BaseProviderProps): JSX.Element => {
  const { children } = props;

  const Providers = providers.reduceRight(
    (nestedProviders, CurrentProvider) => {
      return React.createElement(CurrentProvider, null, nestedProviders);
    },
    children
  );

  return <>{Providers}</>;
};

export default BaseProvider;
