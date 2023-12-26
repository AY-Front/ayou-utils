export type ParamType = "String" | "Function" | "Object" | "BigInt" | "Boolean" | "Number" | "Symbol" | "Undefined";

const isType = (param: ParamType) => {
  return (value: any) => {
    const typeString = Object.prototype.toString.call(value);
    const regex = /\[object (.+)\]/;
    const match = regex.exec(typeString)?.[1];
    return param === match;
  };
};

export { isType };
