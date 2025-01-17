class PlayerState {
    constructor() {
      this.pizzas = {
        "p1": {
          pizzaId: "s001",
          hp: 30,
          maxHp: 50,
          xp: 90,
          maxXp: 100,
          level: 1,
          status: { type: "saucy" },
        },
        "p2": {
          pizzaId: "v001",
          hp: 50,
          maxHp: 50,
          xp: 75,
          maxXp: 100,
          level: 1,
          status: null,
        },
        "p3": {
          pizzaId: "f001",
          hp: 50,
          maxHp: 50,
          xp: 75,
          maxXp: 100,
          level: 1,
          status: null,
        }
      }
      this.lineup = ["p1", "p2"];
      this.items = [
        { actionId: "item_recoverHp", instanceId: "item1" },
        { actionId: "item_recoverHp", instanceId: "item2" },
        { actionId: "item_recoverHp", instanceId: "item3" },
      ]
      // allows to set story flags to true from the get go
      this.storyFlags = {
          // "DID_SOMETHING": true,
        // TALKED_TO_ERIO: false
        "TUTORIAL": true,
        "P1": true,
        "HUNGRY_NOT_SERVED": true,
        // FOR PLAYTESTING PURPOSES
        // "USED_PIZZA_STONE": true,
        // "TUT_DONE": true

      };
    }

    addPizza(pizzaId) {
      const newId = `p${Date.now()}` + Math.floor(Math.random() * 99999);
      this.pizzas[newId] = {
        pizzaId,
        hp: 50,
        maxHp: 50,
        xp: 75,
        maxXp: 100,
        level: 1,
        status: null,
      }
      if (this.lineup.length < 3) {
        this.lineup.push(newId)
      }
      utils.emitEvent("LineupChanged");
      console.log(this)
    }
  
    swapLineup(oldId, incomingId) {
      const oldIndex = this.lineup.indexOf(oldId);
      this.lineup[oldIndex] = incomingId;
      utils.emitEvent("LineupChanged");
    }
  
    moveToFront(futureFrontId) {
      this.lineup = this.lineup.filter(id => id !== futureFrontId);
      this.lineup.unshift(futureFrontId);
      utils.emitEvent("LineupChanged");
    }
  
  }
  window.playerState = new PlayerState();