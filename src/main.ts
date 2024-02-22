// import {vec2, vec3} from 'gl-matrix';
// // import * as Stats from 'stats-js';
// // import * as DAT from 'dat-gui';

// import OpenGLRenderer from './rendering/OpenGLRenderer';
// // import Camera from './Camera';
// import {setGL} from './globals';

// // import ShaderProgram, {Shader} from './rendering/ShaderProgram';

// import { draw } from './FluidDraw';
// import { inputsForScene } from './FluidHTMLButtons';
// import {
//   makeScene,
//   Scene,
//   SceneConfig,
//   SceneTag,
//   setObstacle,
// } from './FluidScene';

// import { Canvas, CanvasListener } from './Utils/Canvas';


// // import { createFluidSim, FluidSim } from './FluidSim';

// // Define an object with application parameters and button callbacks
// // This will be referred to by dat.GUI's functions that add GUI elements.
// const controls = {
//   tesselations: 5,
//   'Load Scene': loadScene, // A function pointer, essentially
// };

// let time: number = 0;
// let scene: Scene; 
// let canvasSize: vec2;
// let cSize: vec2; 

// // start sim automatically - if false, we manually step  
// let autostart: boolean = true; 

// // mouse down for drag 
// let mouseDown: boolean = false; 

// function loadScene() {
//   // time = 0;

//   // intialize the scene - wind scene 
//   canvasSize = vec2.fromValues(window.innerWidth - 80, window.innerHeight - 270);
//   scene = makeScene('Wind Scene', canvasSize, overrides);
// }

// // simulation function - calls fluid simulation
// function simulate() {
//   scene.fluid.simulate(scene, scene.dt);
//   scene.frameNr = scene.frameNr + 1;
// }

// // step function - calls next step 
// function step() {
//   scene.paused = false;
//   simulate();
//   draw(scene, cSize, gl);
//   scene.paused = true;
// }

// // ---------------------

// function startDrag(cx: number, cy: number, isLeft: boolean) {
//   mouseDown = true;
//   setObstacle(scene, sX(cx), sY(cy), true, isLeft);
// }

// function drag(cx: number, cy: number, isLeft: boolean) {
//   if (mouseDown) {
//     setObstacle(scene, sX(cx), sY(cy), false, isLeft);
//   }
// }

// function endDrag() {
//   mouseDown = false;
// }

// function updateObstacle() {
//   setObstacle(scene, scene.obstacleX, scene.obstacleY, false);
// }

// function sX(canvasX: number) {
//   return canvasX / cSize[1];
// }

// // Simulation coordinates go from [0, 1] on the Y-axis
// function sY(canvasY: number) {
//   return (cSize[1] - canvasY) / cSize[1];
// }

// // Cache slider overrides, so that we can keep it when switching scenes.
// let overrides: Partial<SceneConfig> = {};

// // ----------------------
// function createFluidSim(options: {
//   initialScene: SceneTag;
//   canvasDomId: string;
//   buttonsDomId: string;
//   canvasSize: vec2;
//   autostart: boolean;
//   resolutionOverride?: number;
// }) {
//   overrides.resolution = options.resolutionOverride;

//   const { canvasSize } = options;
//   const initialScene = makeScene(options.initialScene, canvasSize, overrides);

//   // const fluidCanvas = new Canvas(
//   //   document.getElementById(options.canvasDomId) as HTMLCanvasElement,
//   //   canvasSize
//   // );
//   // const fluidSim = new FluidSim(initialScene, canvasSize, fluidCanvas.context);
//   // fluidCanvas.setListener(fluidSim);

//   // options.autostart ? fluidSim.update() : fluidSim.step();

//   appendInputs(
//     document.getElementById(options.buttonsDomId)!,
//     canvasSize,
//     initialScene,
//     // fluidSim
//   );
// }

// function appendInputs(
//   inputDiv: HTMLElement,
//   canvasSize: vec2,
//   initialScene: Scene,
//   // fluidSim: FluidSim
// ) {
//   const setDiv = (scene: Scene) => {
//     inputDiv.innerHTML = '';
//     inputDiv.append(
//       ...inputsForScene({
//         scene,
//         onPauseToggled: () => {
//           scene.paused = !scene.paused; 
//         },
//         onObstacleChanged: () => {
//           updateObstacle(); 
//         },
//         onChangeScene,
//         onChangeOverrides,
//       })
//     );
//   };

//   const onChangeScene = (tag: SceneTag, clearOverrides: boolean) => {
//     if (clearOverrides) {
//       overrides = {};
//     }
//     const newScene = makeScene(tag, canvasSize, overrides);
//     setDiv(newScene);
//     scene = newScene;  
//   };

//   const onChangeOverrides = (newOverrides: Partial<SceneConfig>) => {
//     overrides = { ...overrides, ...(newOverrides ?? {}) };
//   };

//   setDiv(initialScene);
// }


// // ---------------------

// function main() {
//   // Initial display for framerate
//   // const stats = Stats();
//   // stats.setMode(0);
//   // stats.domElement.style.position = 'absolute';
//   // stats.domElement.style.left = '0px';
//   // stats.domElement.style.top = '0px';
//   // document.body.appendChild(stats.domElement);

//   // Add controls to the gui
//   // const gui = new DAT.GUI();

//   // ------- create fluid simulation -------
//   // get canvas and webgl context
//   const canvas = <HTMLCanvasElement> document.getElementById('canvas');
//   const gl = <WebGL2RenderingContext> canvas.getContext('webgl2');
//   if (!gl) {
//     alert('WebGL 2 not supported!');
//   }

//   // create fluid sim 
//   const fluidSim = new FluidSim(scene, canvasSize, gl);
  
//   // if autostart is true, call update - else call step function 
//   autostart ? fluidSim.update() : fluidSim.step();

//   // append inputs 

//   // `setGL` is a function imported above which sets the value of `gl` in the `globals.ts` module.
//   // Later, we can import `gl` from `globals.ts` to access it
//   setGL(gl);

//   // Initial call to load scene
//   loadScene();

//   // const camera = new Camera(vec3.fromValues(0, 0, -10), vec3.fromValues(0, 0, 0));

//   const renderer = new OpenGLRenderer(canvas);
//   renderer.setClearColor(164.0 / 255.0, 233.0 / 255.0, 1.0, 1);
//   gl.enable(gl.DEPTH_TEST);

//   // ------- shader programs ----------------
//   // const flat = new ShaderProgram([
//   //   new Shader(gl.VERTEX_SHADER, require('./shaders/flat-vert.glsl')),
//   //   new Shader(gl.FRAGMENT_SHADER, require('./shaders/flat-frag.glsl')),
//   // ]);

//   // function to process key presses 
//   function processKeyPresses() {
//     // check if 'm' or 'p' key are down
//     window.addEventListener('keypress', function (e) {
//       // console.log(e.key);
//       switch(e.key) {
//         // if 'm' - manually call step function
//         case 'm':
//           step();
//           break; 
//         // if 'p' - pause the simulation
//         case 'p':
//           scene.paused = !scene.paused; 
//           break; 
//       }
//     }, false);
//   }

//   // This function will be called every frame - update 
//   function tick() {
//     // camera.update();
    
//     // stats.begin();
//     gl.viewport(0, 0, window.innerWidth, window.innerHeight);
    
//     renderer.clear();
//     processKeyPresses();

//     simulate();
//     draw(scene, cSize, gl);
    
//     // Call rendering 
//     // renderer.render(camera, flat, [
//     //   square,
//     // ], time);

//     time++;
//     // stats.end();

//     // if scene isn't paused - call `tick` again to renders a new frame
//     if (!scene.paused) {
//       requestAnimationFrame(tick);
//     }
//   }

//   window.addEventListener('resize', function() {
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     // camera.setAspectRatio(window.innerWidth / window.innerHeight);
//     // camera.updateProjectionMatrix();
//     // flat.setDimensions(window.innerWidth, window.innerHeight);
//   }, false);

//   renderer.setSize(window.innerWidth, window.innerHeight);
//   // camera.setAspectRatio(window.innerWidth / window.innerHeight);
//   // camera.updateProjectionMatrix();
//   // flat.setDimensions(window.innerWidth, window.innerHeight);

//   // Start the render loop
//   tick();
// }

// main();
