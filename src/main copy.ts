// import { draw } from './src/FluidDraw';
// import { inputsForScene } from './src/FluidHTMLButtons';
// import {
//   makeScene,
//   Scene,
//   SceneConfig,
//   SceneTag,
//   setObstacle,
// } from './src/FluidScene';

// import { Canvas, CanvasListener } from './src/Utils/Canvas';
// import {vec2} from 'gl-matrix'; 

// // ------------------------------
// import OpenGLRenderer from './src/rendering/OpenGLRenderer';
// import {setGL} from './src/globals';

// // ------------------------------

// // variables 
// let time: number = 0;
// let scene: Scene; 
// let canvasSize: vec2;
// let cSize: vec2;  
// let autostart: boolean = true; 
// let mouseDown: boolean = false; 

// // added for tickCount
// let tickCount: GLint = 0;

// // let context: WebGL2RenderingContext;
// let context: CanvasRenderingContext2D;
// let overrides: Partial<SceneConfig> = {};

// // ---------------------

// function loadScene() {
//   // time = 0;

//   // intialize the scene - wind scene 
//   overrides = {};
//   canvasSize = vec2.fromValues(window.innerWidth - 80, window.innerHeight - 270);
//   scene = makeScene('Wind Scene', canvasSize, overrides);
// }

// // step function - calls next step 
// function step() {
//   scene.paused = false;
//   simulate();
//   draw(scene, cSize, context);
//   scene.paused = true;
// }

// // simulation function - calls fluid simulation
// function simulate() {
//   scene.fluid.simulate(scene, scene.dt);
//   scene.frameNr = scene.frameNr + 1;
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

// // function to process key presses 
// function processKeyPresses() {
//   // check if 'm' or 'p' key are down
//   document.addEventListener('keypress', function (e) {
//     // console.log(e.key);
//     switch(e.key) {
//       // if 'm' - manually call step function
//       case 'm':
//         step();
//         break; 
//       // if 'p' - pause the simulation
//       case 'p':
//         scene.paused = !scene.paused; 
//         break; 
//     }
//   }, false);  
// }

// // ---------------------

// function main() {
//   // Get the canvas element
//   const canvas = document.getElementById('canvas') as HTMLCanvasElement;
//   const boundingRect = canvas.getBoundingClientRect();
  
//   // Get the WebGL2 rendering context
//   const gl = canvas.getContext('webgl2');

//   // Check if WebGL2 is supported
//   if (!gl) {
//     alert('WebGL 2 not supported!');
//     return; // Exit the function if WebGL2 is not supported
//   }

//   let initialScene: SceneTag  = 'Wind Scene';
//   let buttonsDomId: string = 'inputDiv';
//   let canvasSize: vec2 = vec2.fromValues(canvas.width, canvas.height);
//   let resolutionOverride: undefined;
//   let autostart: boolean = true;

//   processKeyPresses(); 

//   // --------- for moving obstacle -------------------

//   document.addEventListener('mousedown', function(e) {
//     mouseDown = true;
//     // set obstacle 
//     const newX = e.clientX - boundingRect.x;
//     const newY = e.clientY - boundingRect.y;    
//     setObstacle(scene, sX(newX), sY(newY), true, e.buttons === 1);
//   });

//   document.addEventListener('mousemove', function(e) {
//       if (mouseDown) {
//           // set obstacle 
//           const newX = e.clientX - boundingRect.x;
//           const newY = e.clientY - boundingRect.y;  
//           setObstacle(scene, sX(newX), sY(newY), true, e.buttons === 1);
//       }
//   });

//   // when mouse is released
//   document.addEventListener('mouseup', function(event) {
//     mouseDown = false;
//   });

//   loadScene(); 

//   // -----------
//   // Cache slider overrides, so that we can keep it when switching scenes.
//   overrides = {};
//   overrides.resolution = resolutionOverride;
//   const scene0 = makeScene(initialScene, canvasSize, overrides);

//   const fluidCanvas = new Canvas(canvas, canvasSize);
//   // const fluidSim = new FluidSim(scene0, canvasSize, gl);
//   // fluidCanvas.setListener(fluidSim);

//   autostart ? tick() : step();

//   function tick() {
//     // increase tickCount 
//     tickCount++;

//     simulate();
//     draw(scene, cSize, context);
//     if (!scene.paused) {
//       // if scene isn't paused - call `tick` again to renders a new frame
//       requestAnimationFrame(tick);
//       // requestAnimationFrame(this.update.bind(this));
//     }
//   }  
//     // ---------
   
//   const inputDiv = document.getElementById(buttonsDomId)!;
//   const setDiv = (scene: Scene) => {
//     inputDiv.innerHTML = '';
//     inputDiv.append(
//       ...inputsForScene({
//         scene,
//         onPauseToggled: () => {
//           // fluidSim.pausePressed();
//           scene.paused = !scene.paused;
//         },
//         onObstacleChanged: () => {
//           // fluidSim.updateObstacle();
//           updateObstacle();
//         },
//         onChangeScene,
//         onChangeOverrides,
//       })
//     );
//   };

//   const onChangeScene = (tag: SceneTag, clearOverrides: boolean) => {
//     if (clearOverrides) {
//       overrides.resolution = undefined;
//     }
//     const updatedScene = makeScene(tag, canvasSize, overrides);
//     setDiv(updatedScene);
//     scene = updatedScene;
//   };

//   const onChangeOverrides = (newOverrides: Partial<SceneConfig>) => {
//     overrides.resolution = newOverrides.resolution;
//   };

//   setDiv(scene0);

//   tick();

// }

// main(); 

// // ---------------------
  
// // function main() {
// //   // Initial display for framerate
// //   // const stats = Stats();
// //   // stats.setMode(0);
// //   // stats.domElement.style.position = 'absolute';
// //   // stats.domElement.style.left = '0px';
// //   // stats.domElement.style.top = '0px';
// //   // document.body.appendChild(stats.domElement);

// //   // Add controls to the gui
// //   // const gui = new DAT.GUI();

// //   // ------- create fluid simulation -------
// //   // get canvas and webgl context
// //   const canvas = <HTMLCanvasElement> document.getElementById('canvas');
// //   const gl = <WebGL2RenderingContext> canvas.getContext('webgl2');
// //   if (!gl) {
// //     alert('WebGL 2 not supported!');
// //   }



// //   // This function will be called every frame - update 
// //   function tick() {
// //     // camera.update();
    
// //     // stats.begin();
// //     gl.viewport(0, 0, window.innerWidth, window.innerHeight);
    
// //     renderer.clear();
// //     processKeyPresses();

// //     simulate();
// //     draw(scene, cSize, gl);
    
// //     // Call rendering 
// //     // renderer.render(camera, flat, [
// //     //   square,
// //     // ], time);

// //     time++;
// //     // stats.end();

// //     // if scene isn't paused - call `tick` again to renders a new frame
// //     if (!scene.paused) {
// //       requestAnimationFrame(tick);
// //     }
// //   }

// //   // create fluid sim 
// //   const fluidSim = new FluidSim(scene, canvasSize, gl);
  
// //   // if autostart is true, call update - else call step function 
// //   autostart ? fluidSim.update() : fluidSim.step();

// //   // append inputs 

// //   // `setGL` is a function imported above which sets the value of `gl` in the `globals.ts` module.
// //   // Later, we can import `gl` from `globals.ts` to access it
// //   setGL(gl);

// //   // Initial call to load scene
// //   loadScene();

// //   // const camera = new Camera(vec3.fromValues(0, 0, -10), vec3.fromValues(0, 0, 0));

// //   const renderer = new OpenGLRenderer(canvas);
// //   renderer.setClearColor(164.0 / 255.0, 233.0 / 255.0, 1.0, 1);
// //   gl.enable(gl.DEPTH_TEST);

// //   // ------- shader programs ----------------
// //   // const flat = new ShaderProgram([
// //   //   new Shader(gl.VERTEX_SHADER, require('./shaders/flat-vert.glsl')),
// //   //   new Shader(gl.FRAGMENT_SHADER, require('./shaders/flat-frag.glsl')),
// //   // ]);

// //   window.addEventListener('resize', function() {
// //     renderer.setSize(window.innerWidth, window.innerHeight);
// //     // camera.setAspectRatio(window.innerWidth / window.innerHeight);
// //     // camera.updateProjectionMatrix();
// //     // flat.setDimensions(window.innerWidth, window.innerHeight);
// //   }, false);

// //   renderer.setSize(window.innerWidth, window.innerHeight);
// //   // camera.setAspectRatio(window.innerWidth / window.innerHeight);
// //   // camera.updateProjectionMatrix();
// //   // flat.setDimensions(window.innerWidth, window.innerHeight);

// //   // Start the render loop
// //   tick();
// // }

// // main();


// // ---------------------

