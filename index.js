class Player {
    constructor(name, position) {
        this.name = name;
        this.position = position;
    }

    describe() {
        return `${this.name} plays ${this.position}.`;
    }
}

class Team {
    constructor(name) {
        this.name = name;
        this.pokemon = [];
    }

    addPokemon(player) {
        if (player instanceof Player) {
            this.pokemon.push(player);
        } else {
            throw new Error('You can ony add an instance of Pokemon. Argument is not a Pokemon: ${player}');
        }
    }

    describe() {
        return `${this.name} has ${this.pokemon.length} pokemon.`;
    }
}

class Menu {
    constructor() {
        this.teams = [];
        this.selectedTeam = null;
    }

    start() {
        let selection = this.showMainMenuOptions();
        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.createTeam();
                    break;
                case '2':
                    this.viewTeam();
                    break;
                case '3': 
                    this.deleteTeam();
                    break;
                case '4':
                    this.displayTeams();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }

        alert('Goodbye!')
    }

    showMainMenuOptions() {
        return prompt(`
            0) exit
            1) choose a color
            2) view team comp
            3) delete team
            4) display all teams
        `);
    }

    showTeamMenuOptions(teamInfo) {
        return prompt(`
            0) back
            1) choose a pokemon
            2) delete a pokemon
            ----------------------
            ${teamInfo}
        `);
    }

    displayTeams() {
        let teamString = '';
        for(let i = 0; i < this.teams.length; i++) {
            teamString += i + ') ' + this.teams[i].name + '\n';
        }
        alert(teamString);
    }

    createTeam() {
        let name = prompt('Enter a team color:');
        this.teams.push(new Team(name));
    }

    viewTeam() {
        let index = prompt('Enter the index of the Pokemon team you wish to view:');
        if (index > -1 && index < this.teams.length) {
            this.selectedTeam = this.teams[index];
            let description = 'Team Name: ' + this.selectedTeam.name + '\n';

            for(let i = 0; i < this.selectedTeam.pokemon.length; i++) {
                description += i + ') ' + this.selectedTeam.pokemon[i].name + ' - ' + this.selectedTeam.pokemon[i].position + '\n';
            }

            let selection = this.showTeamMenuOptions(description);
            switch (selection) {
                case '1':
                    this.choosePokemon();
                    break;
                case '2':
                    this.deletePokemon();
            }
        }
    }

    deleteTeam() {
        let index = prompt('Enter the index of the team you wish to delete:');
        if (index > -1 && index < this.teams.length) {
            this.teams.splice(index, 1);
        }
    }


    choosePokemon() {
        let name = prompt('Enter Pokemon name');
        this.selectedTeam.pokemon.push(new Player(name, position));
    }

    deletePokemon() {
        let index = prompt('Enter the index of the pokemon you wish to delete');
        if (index > -1 && index < this.selectedTeam.pokemon.length) {
            this.selectedTeam.pokemon.splice(index, 1);
        }
    }
}

let menu = new Menu();
menu.start();