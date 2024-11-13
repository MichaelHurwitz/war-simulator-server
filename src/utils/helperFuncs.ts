import organizations from "../data/organizations.json";


export const getMissilesForOrganization = (organizationName: string): string[] => {
    const organization = organizations.find((org) => org.name === organizationName);
  
    if (!organization) {
      throw new Error(`Organization ${organizationName} not found`);
    }
  
    const missileNames = organization.resources.map((resource: any) => {
      return typeof resource === "string" ? resource : resource.name;
    });
  
    return missileNames;
  };
  