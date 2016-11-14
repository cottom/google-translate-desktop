export function throwIfAlreadyLoaded(parentModule: any, moduleName: string) {
  if (parentModule) {
      throw new Error(`${moduleName} has already beenloadded.Import Core modules in the AppModule noly.`);
  }
};
