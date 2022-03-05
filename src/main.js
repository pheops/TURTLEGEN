


// Find the latest version by visiting https://cdn.skypack.dev/three.

import * as THREE from "https://cdn.skypack.dev/three@0.132.2";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/DRACOLoader.js';
import { RGBELoader } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/RGBELoader.js';
import { GLTFExporter } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/exporters/GLTFExporter.js';
import { USDZExporter } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/exporters/USDZExporter.js';

let width = window.innerWidth
let height = window.innerWidth


let offset;

let camera, scene, renderer, mesh, mixer, clock;

let grid;
let controls;
var metal = 0;
var rough = 0;
var envMap ;
let turtleMesh;
var textureEquirec;
var skyEquirec;


let pngCubeRenderTarget, exrCubeRenderTarget;
      let pngBackground, exrBackground;

const params = {
  metalness: 0.5,
  roughness:0.5,
  exposure: 1.0, 

}


      init();
      animate();
     



function init() {

        //const container = document.createElement( 'div' );
        const container = document.getElementById( 'container' );

        //document.body.appendChild( container );

        renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        //renderer.setAnimationLoop( render );
        renderer.outputEncoding = THREE.sRGBEncoding;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.0;
        container.appendChild( renderer.domElement );


        window.addEventListener( 'resize', onWindowResize );

        const aspect = window.innerWidth / window.innerHeight;
        camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 0.1, 1000 );
         //camera.position.set(-8,.5,0);
        camera.position.z = 5;

        controls = new OrbitControls( camera, container );
        controls.target.set( .5, 0.5, 0 );
        controls.update();

        const pmremGenerator = new THREE.PMREMGenerator( renderer );

        scene = new THREE.Scene();
        //scene.background = new THREE.Color( 0x383434);
        //scene.environment = pmremGenerator.fromScene( new RoomEnvironment() ).texture;
        //scene.fog = new THREE.Fog( 0xeeeeee, 10, 50 );

        // grid = new THREE.GridHelper( 100, 40, 0xffffff, 0xffffff );
        //grid = new THREE.PolarGridHelper( 5, 5, 5, 64 )
        //grid.position.y = -.5;
        //grid.position.x = .3;
             //grid.position.x = -.7;
             // grid.material.opacity = 0.1;
             // grid.material.depthWrite = false;
             // grid.material.transparent = true;
             //scene.add( grid );


////LOADING SCREEN

  clock = new THREE.Clock();
  
  const loadingManager = new THREE.LoadingManager( () => {
  
    const loadingScreen = document.getElementById( 'loading-screen' );
    loadingScreen.classList.add( 'fade-out' );
    
    // optional: remove loader from DOM via event listener
    loadingScreen.addEventListener( 'transitionend', onTransitionEnd );
    
  } );


////ENVIRONMENT

const environLoader = new THREE.TextureLoader(loadingManager );

        textureEquirec = environLoader.load( './assets/drackenstein_quarry.jpg' );
        textureEquirec.mapping = THREE.EquirectangularReflectionMapping;
        textureEquirec.encoding = THREE.sRGBEncoding;

        scene.environment = textureEquirec;

const skyLoader = new THREE.TextureLoader(loadingManager );

        skyEquirec = skyLoader.load( './assets/sky2.png' );
        skyEquirec.mapping = THREE.EquirectangularReflectionMapping;
        skyEquirec.encoding = THREE.sRGBEncoding;

        scene.background = skyEquirec;


////MATERIALS

const loader = new THREE.TextureLoader(loadingManager);
    
    const texture1 = loader.load( './assets/IVORYBAKE.png' );
     texture1.flipY=false
    const rough1 = loader.load( './assets/TDROUGH.png' );
     rough1.flipY=false 
    const normal1 = loader.load( './assets/NORMAL.png' );
     normal1.flipY=false 

    const texture2 = loader.load( './assets/STONECOLOR.png' );
     texture2.flipY=false
    const rough2 = loader.load( './assets/STONEROUGH.png' );
     rough2.flipY=false 
    const normal2 = loader.load( './assets/STONENORM.png' );
     normal2.flipY=false  

    const texture3 = loader.load( './assets/SCRATCHCOLOR.png' );
     texture3.flipY=false
    const rough3 = loader.load( './assets/SCRATCHROUGH.png' );
     rough3.flipY=false 
    const normal3 = loader.load( './assets/SCRATCHNORMAL.png' );
     normal3.flipY=false 

    const texture4 = loader.load( './assets/TDCOLOR.png' );
     texture4.flipY=false
    const rough4 = loader.load( './assets/TDROUGH.png' );
     rough4.flipY=false 
    const normal4 = loader.load( './assets/TDNORMAL.png' );
     normal4.flipY=false  


    const material = new THREE.MeshStandardMaterial( 
      { map: texture1, 
        roughnessMap: rough1,
        normalMap: normal1,


       } );


////TEXTURE HEX BUTTONS

var hexbuttons = document.getElementsByClassName("hexbuttons"); 

//console.log(hexbuttons) 

for (let i = 0; i < hexbuttons.length; i++) {
  hexbuttons[i].addEventListener("click", onButtonClick, false);
};

var buttons = document.getElementsByTagName("button");

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", onButtonClick, false);
};


function onButtonClick(event) {
 

  if (event.target.id == "download"){
     alert("Download GTLF");
     download();
     }

  if (event.target.id == "ar"){
     alert("Download USDZ");
     downloadAR();
     }

  if (event.target.id == "1"){

     material.map = texture1;
     material.roughnessMap = rough1;
     material.normalMap = normal1;
      //texture1.dispose();


     }
     
  if (event.target.id == "2"){

     material.map = texture2;
     material.roughnessMap = rough2;
     material.normalMap = normal2;
  
     } 

  if (event.target.id == "3"){

     material.map = texture3;
      material.roughnessMap = rough3;
     material.normalMap = normal3;
  
     } 

  if (event.target.id == "4"){

     material.map = texture4;
      material.roughnessMap = rough4;
     material.normalMap = normal4;
  
     }      


}


////COOR PICKER AND METAL/ROUGH SLIDERS

      var colorPicker = new iro.ColorPicker("#picker", {
      // Set the size of the color picker
      width: 190,
      // Set the initial color to WHITE
      color: "#ffffff"
      });

      var hex = colorPicker.color.hexString;
      //console.log(hex); // hex = "#ff0000"

      // listen to a color picker's color:change event
      // color:change callbacks receive the current color
      colorPicker.on('color:change', function(color) {
      // log the current color as a HEX string
      //console.log(color.hexString);
  
       material.color.set( color.hexString );
      });


      var metalSlider = document.getElementById("metalRange");
      var output = document.getElementById("demo");
      //output.innerHTML = metalSlider.value;

      metalSlider.oninput = function() {
        //output.innerHTML = this.value;
        //console.log(slider.value)
         var metal = metalSlider.value/100;
         params.metalness = metal;
         material.metalness =  params.metalness ;
           
      }

      var roughSlider = document.getElementById("roughRange");
      var output2 = document.getElementById("demo2");
      //output2.innerHTML = roughSlider.value;

      roughSlider.oninput = function() {
        //output2.innerHTML = this.value;
        //console.log(slider.value)
         var rough = roughSlider.value/100;
         params.roughness = rough;
         material.roughness =  params.roughness ;
           
      }

      // var envSlider = document.getElementById("envRange");
      // var output3 = document.getElementById("demo3");
      // output3.innerHTML = envSlider.value;

      // envSlider.oninput = function() {
      //   output3.innerHTML = this.value;
      //   //console.log(slider.value)
      //    var envInt = envSlider.value/50;
      //    params.exposure = envInt;
      //    //console.log(params.exposure)
      //    //ivoryMaterial.roughness =  params.roughness ;
          
      // }



  //// TURTLE MODEL LOADER

        const dracoLoader = new DRACOLoader(loadingManager );
        dracoLoader.setDecoderPath( 'js/libs/draco/gltf/' );


        const modelLoader = new GLTFLoader(loadingManager );
        modelLoader.setDRACOLoader( dracoLoader );
        modelLoader.load( './assets/smallturtle-normal.glb', function ( gtlf ) {

           //const fullmodel = gtlf.scene//.children[0].children[0].geometry//.children[0].geometry;
           const model = gtlf.scene.children[0].geometry//.children[0].geometry;
           //console.log(model)
           let turtleMesh = new THREE.Mesh( model, material );
           turtleMesh.position.y = -.5
           turtleMesh.rotation.y = Math.PI / 4;
           scene.add( turtleMesh );

        } );








////LIGHTS

        // const ambientLight = new THREE.AmbientLight( 0x404040, .1);
        // scene.add( ambientLight );

        // const pointLight = new THREE.PointLight( 0xffffff, .1);
        // pointLight.position.z = 5;
        // pointLight.decay = 2;
        // scene.add( pointLight );

        // const pointLight2 = new THREE.PointLight( 0xffffff, .1 );
        //  pointLight2.position.z = -5;
        // scene.add( pointLight2 );
        //   pointLight2.decay = 2;
       

        


      }

////////////////////////////////////////////////////////////////////////

function onTransitionEnd( event ) {

  event.target.remove();
  
}



function download() {
  const exporter = new GLTFExporter();
  exporter.parse(
    scene,
    function (result) {
      console.log(result)
      saveArrayBuffer(result, 'scene.glb');
    },
    { binary: true }
  );
}

async function downloadAR() {
    //console.log(scene.children[0])
    const exporter = new USDZExporter();
    const arraybuffer = await exporter.parse( scene.children[0]);
    //console.log(arraybuffer);
    //const blob = new Blob( [ arraybuffer ], { type: 'application/octet-stream' } );
    saveArrayBuffer(arraybuffer, 'scene.usdz')
    
  
}





function saveArrayBuffer(buffer, filename) {
  save(new Blob([buffer], { type: 'application/octet-stream' }), filename);
}

const link = document.createElement('a');
link.style.display = 'none';
document.body.appendChild(link); // Firefox workaround, see #6594

function save(blob, filename) {
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();

  // URL.revokeObjectURL( url ); breaks Firefox...
}
  




         


function animate() {

    requestAnimationFrame(animate);
    render();
  
}



function render() {

    renderer.toneMappingExposure = params.exposure;
    renderer.render(scene, camera)

}


function onWindowResize() {

        const width = window.innerWidth;
        const height = window.innerHeight;
        const aspect = window.innerWidth / window.innerHeight;

        camera.aspect = aspect;

        camera.left = - height * aspect;
        camera.right = height * aspect;
        camera.top = height;
        camera.bottom = - height;

        camera.updateProjectionMatrix();

        renderer.setSize( width, height );

      }







///DIALS
function updateDonut(percent, element){
  //var percent = 45;
  if (percent < 50){
    offset = (360 / 100) * percent;
    element.parentNode.querySelector("#section3").style.webkitTransform = "rotate(" + offset + "deg)";
    element.parentNode.querySelector("#section3 .item").style.webkitTransform = "rotate(" + (180 - offset) + "deg)";
    element.parentNode.querySelector("#section3").style.msTransform = "rotate(" + offset + "deg)";
    element.parentNode.querySelector("#section3 .item").style.msTransform = "rotate(" + (180 - offset) + "deg)";
    element.parentNode.querySelector("#section3").style.MozTransform = "rotate(" + offset + "deg)";
    element.parentNode.querySelector("#section3 .item").style.MozTransform = "rotate(" + (180 - offset) + "deg)";
    element.parentNode.querySelector("#section3 .item").style.backgroundColor = "#41A8AB";
  } else { 
    offset = ((360 / 100) * percent) - 180;
    element.parentNode.querySelector("#section3").style.webkitTransform = "rotate(180deg)";
    element.parentNode.querySelector("#section3 .item").style.webkitTransform = "rotate(" +  offset + "deg)";
    element.parentNode.querySelector("#section3").style.msTransform = "rotate(180deg)";
    element.parentNode.querySelector("#section3 .item").style.msTransform = "rotate(" +  offset + "deg)";
    element.parentNode.querySelector("#section3").style.MozTransform = "rotate(180deg)";
    element.parentNode.querySelector("#section3 .item").style.MozTransform = "rotate(" +  offset + "deg)";   
    element.parentNode.querySelector("#section3 .item").style.backgroundColor = "#E64C65";
  }
  element.parentNode.querySelector("span").innerHTML = percent + "%";
}

function updateSlider(element) {
  if (element) {
    var parent = element.parentElement;
    var thumb = parent.querySelector('.range-slider__thumb'),
        bar = parent.querySelector('.range-slider__bar'),
        pct = element.value * ((parent.clientHeight - thumb.clientHeight) / parent.clientHeight);
    thumb.style.bottom = pct + '%';
    bar.style.height = 'calc(' + pct + '% + ' + thumb.clientHeight / 2 + 'px)';
    thumb.textContent = element.value + '%';
  }
  updateDonut(element.value, element.parentNode);
}
(function initAndSetupTheSliders() {
    [].forEach.call(document.getElementsByClassName("dial-container"), function(el) {
      var inputs = [].slice.call(el.querySelectorAll('.range-slider input'));
      inputs.forEach(function (input) {
          input.setAttribute('value', '50');
          updateSlider(input);
          input.addEventListener('input', function (element) {
              updateSlider(input);
          
          });
          input.addEventListener('change', function (element) {
            
              updateSlider(input);
          });
      });
    });
}());


   