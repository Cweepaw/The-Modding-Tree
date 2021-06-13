addLayer("s", {
    name: "Stars", symbol: "★", resource: "power stars", baseResource: "coins",
    position: 0, row: 1, branches: [],
    color: "#F5BC49",
    type: "custom",
    hotkeys: [{key: "p", description: "[P] Reset for power stars", onPress(){if (canReset(this.layer)) doReset(this.layer)}},],
    milestones: {
      1: {requirementDescription: "1 Power Star",
          effectDescription() {if(hasMilestone('s', 1)) {return 'Unlock red coins'} else {return 'Unlock a new layer'}},
          done(){return player.s.points.gte(1)},},
    },
    startData() { return {unlocked: true, points: new Decimal(0),}},
    baseAmount() {return player.points},
    getResetGain(){return new Decimal(1)},
    getNextAt(){return new Decimal(10)},
    requires(){
      if(player.s.points.gte(0)) {return new Decimal(10)}
      else { return new Decimal(0)}},
    prestigeButtonText() {if(!player.s.points.gte(1)){return `<h2>+1 STAR</h2><br><br>Requires<br><b>`+format(this.requires())+`</b><br>coins`}else{return `<h2>+1 STAR</h2><br><br>Requires<br><b>INFINITY</b><br>coins`}},
    canReset(){if(!player.s.points.gte(1)) {return player.points.gte(this.requires())}else{return false}},
    layerShown(){return true}
})