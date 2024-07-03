import React from "react";

export interface SeaCreature {
  name: string;
  Medal?: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
  title: string;
  Fish: string;
  drops: number;
}
