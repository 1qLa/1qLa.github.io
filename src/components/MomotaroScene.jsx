import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import momotaroUrl from '../assets/momotaro.glb?url'

// ゲームで使っている桃太郎の3Dモデルを、枠の中で左右に歩かせる
const RANGE = 2.4   // 往復する左右の幅
const SPEED = 0.9
const FACE = Math.PI / 2   // モデルが +x 方向を向くようにする

export default function MomotaroScene({ label, caption }) {
  const boxRef = useRef(null)
  const canvasRef = useRef(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const box = boxRef.current
    const canvas = canvasRef.current
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    let disposed = false
    let raf = 0
    let renderer
    let resizeObserver
    let visibleObserver

    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    } catch (e) {
      console.warn('3D preview unavailable', e)
      // 副作用の中で同期的に state を更新しない(再描画が連鎖するため)
      queueMicrotask(() => { if (!disposed) setFailed(true) })
      return () => { disposed = true }
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(30, 16 / 9, 0.1, 50)
    camera.position.set(0, 1.0, 7)
    camera.lookAt(0, 0.85, 0)
    scene.add(new THREE.HemisphereLight(0xffffff, 0x88aa88, 2.2))
    const sun = new THREE.DirectionalLight(0xffffff, 2)
    sun.position.set(2, 4, 3)
    scene.add(sun)

    const resize = () => {
      const w = box.clientWidth
      const h = box.clientHeight
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(box)
    resize()

    new GLTFLoader().loadAsync(momotaroUrl).then((gltf) => {
      if (disposed) return
      const model = gltf.scene
      const size = new THREE.Box3().setFromObject(model).getSize(new THREE.Vector3())
      model.scale.setScalar(1.9 / size.y)
      model.position.y -= new THREE.Box3().setFromObject(model).min.y
      scene.add(model)

      const mixer = new THREE.AnimationMixer(model)
      const clip = THREE.AnimationClip.findByName(gltf.animations, 'walk') || gltf.animations[0]
      if (clip) mixer.clipAction(clip).play()

      let x = -RANGE
      let dir = 1
      let visible = true
      visibleObserver = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
      visibleObserver.observe(box)

      const draw = () => {
        model.position.x = x
        model.rotation.y = dir > 0 ? FACE : -FACE
        renderer.render(scene, camera)
      }
      if (reduce) {
        mixer.update(0.2)
        draw()
        return
      }
      const clock = new THREE.Clock()
      const tick = () => {
        raf = requestAnimationFrame(tick)
        const dt = Math.min(clock.getDelta(), 0.1)
        if (!visible) return
        mixer.update(dt)
        x += dir * SPEED * dt
        if (x > RANGE) { x = RANGE; dir = -1 }
        if (x < -RANGE) { x = -RANGE; dir = 1 }
        draw()
      }
      tick()
    }).catch((e) => {
      console.warn('3D preview unavailable', e)
      if (!disposed) setFailed(true)
    })

    return () => {
      disposed = true
      cancelAnimationFrame(raf)
      resizeObserver?.disconnect()
      visibleObserver?.disconnect()
      renderer.dispose()
    }
  }, [])

  return (
    <div className="media scene" ref={boxRef} role="img" aria-label={label}>
      <canvas ref={canvasRef} />
      <p className="caption">{failed ? '3Dの表示を読み込めませんでした' : caption}</p>
    </div>
  )
}
