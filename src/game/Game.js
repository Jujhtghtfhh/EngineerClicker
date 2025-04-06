import { ResourceManager } from "./ResourceManager";
import { Upgrades } from "./Upgrades";
import { Project } from "./Project";
import { ProjectManager } from "./ProjectManager";
import { LoanManager } from "./LoanManager";

class Game {
  // Managers
  resourceManager;
  upgrades;
  project;
  projectManager;
  loanManager;

  #listeners = []; // List of React components to notify

  constructor() {
    this.resourceManager = new ResourceManager(this);
    this.upgrades = new Upgrades(this);
    this.project = new Project(this);
    this.projectManager = new ProjectManager(this);
    this.loanManager = new LoanManager(this);
  }

  // Subcribe and notify React components
  subscribe(listener) {
    this.#listeners.push(listener);
    return () => {
      this.#listeners = this.#listeners.filter((l) => l !== listener);
    };
  }

  notifyUpdate() {
    this.#listeners.forEach((listener) => listener());
  }

  resetForBankruptcy() {
    this.resourceManager.resetForBankruptcy();
    this.project.resetForBankruptcy();
    this.upgrades.resetForBankruptcy();
    this.projectManager.resetForBankruptcy();
  }
}

const game = new Game();
export default game;
