// import './ThreeMap.css';
import { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Decoration11 } from '@jiaminghi/data-view-react';
function ThreeMap() {
  useEffect(() => {
    iniThree();
  }, []);

  const iniThree = () => {
    const scene = new THREE.Scene(); //创建场景
    const camera = new THREE.PerspectiveCamera(
      35,
      window.innerWidth / window.innerHeight,
      1,
      1000,
    ); //创建相机
    // camera.position.z = 10;  //设置相机坐标
    camera.position.set(3, 1, 20);
    const container = document.getElementById('container') as any;
    const renderer = new THREE.WebGLRenderer(); //生成渲染实例
    renderer.setSize(window.innerWidth - 248, window.innerHeight - 228); //设置宽高
    renderer.setClearColor('#af3', 0.5); //背景颜色
    container.appendChild(renderer.domElement); //生成的渲染的实例, 这个要放到对应的dom容器里面
    // 坐标轴的显示效果
    const axisHelper = new THREE.AxesHelper(5);
    scene.add(axisHelper); //插入辅助线长度为5的坐标系

    //长方体
    const geometry = new THREE.BoxGeometry(4, 2, 3); //长宽高
    const material = new THREE.MeshLambertMaterial({
      color: 0x156289,
      emissive: 0x072534,
    }); //材质
    const cube = new THREE.Mesh(geometry, material); //生成网格，网格上含有位置信息、旋转信息、缩放信息等等, 需要用几何体与材质两个参数, 但其实并不像网上说的必须要有材质, 不传材质也能显示。
    scene.add(cube);

    const orbitControls = new OrbitControls(camera, container);
    // orbitControls.autoRotate = true;
    // orbitControls.target = new THREE.Vector3(0, 0, 0);//控制焦点

    //添加光源
    //自然光
    // const light = new THREE.AmbientLight('blue');
    // scene.add(light)

    //点光源：1、intensity光强。2、distance光源照射的距离, 默认值为0也就是无限。3、visible布尔值, 是否打开光源。4、decay衰减值, 越大衰减速度越快。
    const point_light = new THREE.PointLight('white', 2, 100000);
    point_light.position.set(5, 5, 5);
    scene.add(point_light);

    const animate = function () {
      requestAnimationFrame(animate);
      // orbitControls.update()
      renderer.render(scene, camera);
    };
    animate();
    // renderer.render(scene, camera);
  };
  return (
    <div>
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Decoration11 style={{ width: '200px', height: '60px' }}>
          3D旋转长方体
        </Decoration11>
      </div>
      <div id="container" />
    </div>
  );
}
export default ThreeMap;
