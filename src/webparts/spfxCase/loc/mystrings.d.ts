declare interface ISpfxCaseWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  AppLocalEnvironmentSharePoint: string;
  AppLocalEnvironmentTeams: string;
  AppSharePointEnvironment: string;
  AppTeamsTabEnvironment: string;
}

declare module 'SpfxCaseWebPartStrings' {
  const strings: ISpfxCaseWebPartStrings;
  export = strings;
}
