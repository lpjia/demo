export class Tank {
  x: number = 0
  y: number = 0
  name: string = '坦克'
  health: number = 1
  protected moveSpeed: number = 1

  bulletSpeed: number = 1
  shoot() {
    console.log(`${this.name}发射子弹`)
  }
}

export class PlayerTank extends Tank {
  x: number = 20
  y: number = 20
  name: string = '玩家坦克'
  health: number = 5

  shootSpeed: number = 1

  changeMoveSpeed(moveSpeed: number) {
    this.moveSpeed = moveSpeed
  }
  logMoveSpeed() {
    console.log(this.moveSpeed)
  }
}

export class EnemyTank extends Tank {
  name: string = '敌方坦克'
}

export class BossTank extends EnemyTank {
  health: number = 5
}

const t = new Tank()
const pt: Tank = new PlayerTank()
// Tank类型是父类型, 

const et = new EnemyTank()
const bt = new BossTank()
// console.log(t.x, t.y)
// console.log(pt.x, pt.y)
// console.log(et.x, et.y)
// console.log(bt.x, bt.y)

// bt.shoot()


if (pt instanceof PlayerTank) {
  console.log(pt.shootSpeed)
  pt.changeMoveSpeed(3)
  pt.logMoveSpeed()
}