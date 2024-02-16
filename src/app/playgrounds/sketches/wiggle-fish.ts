/*
  Rainbow Trout by Ivan Rudnicki
  Sketch source: https://openprocessing.org/sketch/1770863
  Author: https://openprocessing.org/user/110137
*/

import { type Sketch, SketchProps, P5CanvasInstance } from "@p5-wrapper/react"
import { P5_PLAYGROUND_ID } from '@/app/constant'

type WiggleFishSketchProps = SketchProps & {
  fishSrcs: string[]
  selectedIndex: number
}

const enterKeyCode = 13

export const sketch: Sketch = (p5: P5CanvasInstance<WiggleFishSketchProps>) => {
  let fishSrcs: string[] = []
  let fishImgs: any[] = []
  let scales: any[] = []
  let orient: any, otarget: any
  let twist: any, ttwist: any
  let tpos: any, tvel: any
  let amp: any
  let wiggle: any

  const container = p5.select(`#${P5_PLAYGROUND_ID}`)
  const width = container.width
  const height = container.height

  class Scale {
    pos
    ang
    mat

    constructor(pos: any, ang: any, mat: any) {
      this.pos = pos
      this.ang = ang
      this.mat = mat
    }

    show() {
      p5.fill(this.mat)
      p5.noStroke()
      p5.push()
      p5.rotateY(twist.y * this.pos.x / 1000)
      p5.rotateZ(twist.z * this.pos.x / 2000)
      if(this.pos.x>0) p5.rotateY(wiggle * this.pos.x / 2000)
      p5.translate(this.pos)
      p5.rotateY(this.ang.y)
      p5.rotateX(-this.ang.x)
      p5.ellipse(0, 0, 15, 15)
      p5.pop()
      p5.push()
      p5.rotateY(twist.y * this.pos.x / 1000)
      p5.rotateZ(twist.z * this.pos.x / 2000)
      if(this.pos.x>0) p5.rotateY(wiggle * this.pos.x / 2000)
      p5.translate(this.pos.x, this.pos.y, -this.pos.z)
      p5.rotateY(-this.ang.y)
      p5.rotateX(this.ang.x)
      p5.ellipse(0, 0, 15, 15)
      p5.pop()
    }
  }

  p5.preload = () => {
    fishSrcs.forEach(src => {
      const img = p5.loadImage(src)
      img.resize(800, 0) // Increase (e.g. 1200) or decrease (e.g. 400) to balance detail/lag
      fishImgs.push(img)
    })
  }

  p5.updateWithProps = (props: WiggleFishSketchProps) => {
    if (props.fishSrcs?.length > 0) {
      fishSrcs = props.fishSrcs
    }

    // Switch to selected fish model
    const selected = props.selectedIndex
    if (selected >= 0 && selected < fishImgs?.length && fishImgs[selected]) {
      p5.makeScales(fishImgs[selected])
    }
  }

  /* TODO: handle browser resize
  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight)
  }
  */

  p5.setup = () => {
    p5.createCanvas(width, height, p5.WEBGL)

    // Create fish model
    if (fishImgs?.[0]) {
      p5.makeScales(fishImgs[0])
    }

    orient = p5.createVector(0, 0, 0)
    otarget = p5.createVector(0, p5.PI / 16, 0)
    tpos = p5.createVector(2 * width, 0, -height / 2)
    tvel = p5.createVector(0, 0, 0)
    twist = p5.createVector(0, 0, 0)
    ttwist = p5.createVector(0, 0, 0)
    amp = width / 50
    wiggle = 0
    const c = p5.createCamera()
    c.perspective(p5.PI / 3.0, width / height, 0.1, 8 * height)
  }

  p5.draw = () => {
    p5.scale(0.5 * height / 566)
    // Call clear() to make background totally transparent
    p5.clear()
    if (p5.frameCount > 20) {
      orient.lerp(otarget, 0.1)
      tvel.z += amp * p5.sin(orient.y)
      tvel.x -= amp * p5.cos(orient.y)
      tvel.y -= amp * p5.sin(orient.z)
      tpos.add(tvel)
      tvel.mult(0.95)
      ttwist.mult(0.8)
      otarget.z *= 0.95
      amp *= 0.8
      twist.lerp(ttwist, 0.25)
      wiggle = (p5.PI / 8) * amp * p5.sin(p5.frameCount / 2)
    }
    p5.translate(tpos)
    p5.rotateX(orient.x)
    p5.rotateY(orient.y)
    p5.rotateZ(orient.z)
    for (let s of scales) {
      s.show()
    }
    p5.checkInputs()
  }

  p5.makeScales = (fish: any) => {
    scales = []
    for (let y = 0; y < fish.height; y += 11) {
      for (let x = 0; x < fish.width; x += 11) {
        let c = p5.color(fish.get(x, y));
        if (p5.brightness(c) < 95) {
          c.setAlpha(200);
          p5.fill(c);
          p5.noStroke();
          let ax = p5.map((y - fish.height / 1.75), -fish.height / 4, fish.height / 4, -p5.HALF_PI, p5.HALF_PI);
          let ay = p5.map((x - fish.width / 2.15), -fish.width / 2, fish.width / 2, -p5.HALF_PI, p5.HALF_PI);
          let tz = p5.cos(ax) * (fish.height / 7) * p5.cos(ay);
          let z = p5.max(-1, tz);
          if (p5.abs(ax) > p5.HALF_PI) {
              ax /= 30;
              c.setAlpha(100);
          }
          if (p5.abs(ay) > p5.HALF_PI) {
              ay /= 30;
              c.setAlpha(100);
          }
          const ang = p5.createVector(ax, ay, 0);
          const pos = p5.createVector(x - fish.width / 2, y - fish.height / 2, z);
          scales.push(new Scale(pos, ang, c));
        }
      }
    }
  }

  p5.checkInputs = () => {
    if (p5.keyIsDown(p5.UP_ARROW)) {
      amp += 1
    }
    if (p5.keyIsDown(p5.DOWN_ARROW)) {
      amp -= 1
    }
    if (p5.mouseIsPressed) {
      amp += 1
    }
    if (p5.keyIsDown(p5.LEFT_ARROW)) {
      otarget.y += 0.2
      ttwist.y -= 0.4
      amp += 0.2
    }
    if (p5.keyIsDown(p5.RIGHT_ARROW)) {
      otarget.y -= 0.2
      ttwist.y += 0.4
      amp += 0.2
    }
    if (p5.frameCount > 20) {
      ttwist.y -= (p5.mouseX - p5.pmouseX) / 200
      ttwist.z += (p5.mouseY - p5.pmouseY) / 100
      otarget.y += (p5.mouseX - p5.pmouseX) / 400
      otarget.z -= (p5.mouseY - p5.pmouseY) / 800
    }
  }

  p5.keyPressed = () => {
    if (p5.keyCode === enterKeyCode && tpos) {
      otarget.y = p5.atan2(-tpos.z, tpos.x)
      ttwist.y = -2 * p5.atan2(-tpos.z, tpos.x)
      setTimeout(p5.goHome, 300)
    }
  }

  p5.goHome = () => {
    orient.y = p5.atan2(-tpos.z, tpos.x)
    amp = p5.dist(tpos.x, tpos.z, 0, 0) / 95
  }
}
