export interface CareerItem {
  icon: string;
  name: string;
  desc: string;
}

export interface HobbyItem {
  icon: string;
  name: string;
  desc: string;
  color: string;
}

export interface PersonConfig {
  company: string;
  name: string;
  team: string;
  joinDate: string;
  subtitle: string;
  intro: string;
  career: CareerItem[];
  hobbies: HobbyItem[];
  welcomeLines: string[];
  marquee: string[];
  finalShout: string;
}
