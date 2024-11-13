export interface Missile {
    name: string;
    description: string;
    speed: number;
    intercepts: string[];
    price: number;
    impactTime?: number;
    interceptionTime?: number;
  }