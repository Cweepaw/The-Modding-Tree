addLayer("r", {
    name: "Red Coins", symbol: "Ⓡ", resource: "red coins", baseResource: "coins",
    position: 0, row: 0, branches: ['s'],
    color: "#F56049", type: "normal",
    exponent: 0.9, requires: new Decimal(10),
    hotkeys: [{key: "r", description: "[R] Reset for red coins", onPress(){if (canReset(this.layer)) doReset(this.layer)}},],
    upgrades: {
      rows: 1,
      cols: 2,
      11: {
        fullDisplay() {return `<h3>Cannon</h3><br>Boost coin gain by red coins<br><br>Effect: `+format(this.effect())+`x<br><br>[COST]<br><b>1</b> red coins`},
        canAfford() {return player.r.points.gte(1)},
        pay() {player.r.points = player.r.points.sub(1)},
        effect() {return player.r.points.plus(1).pow(0.5)},
        unlocked() {return true},
      }, 12: {
        fullDisplay(){return `<h3>Goombas</h3><br>Coins boosts their own gain<br><br>Effect: `+format(this.effect())+`x<br><br>[COST]<br><b>2</b> red coins`},
        canAfford() {return player.r.points.gte(2)},
        pay() {player.r.points = player.r.points.sub(1)},
        effect() {return player.points.plus(1).log(16).plus(1)},
        unlocked() {return hasUpgrade('r', 11)},
      },
    },
    startData() { return {unlocked: true, points: new Decimal(0),}},
    baseAmount() {return player.points},
    layerShown(){return hasMilestone('s', 1)}
})