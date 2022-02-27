


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

let camera, scene, renderer;

let grid;
let controls;
var metal = 0;
var rough = 0;
var envMap ;
var turtleMesh;
var textureEquirec

const params = {
  metalness: 0.0,
  roughness:0.0,
  exposure: 1.0, 

}




// var hexbuttons = document.getElementsByClassName("hexButton");
// // console.log(hexbuttons)
// for (let i = 0; i < hexbuttons.length; i++) {
//   hexbuttons[i].addEventListener("click", onHexButtonClick, false);
// };

// function onHexButtonClick(event) {
//   console.log(event.target.id);
// }





var buttons = document.getElementsByTagName("button");

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", onButtonClick, false);
};


function onButtonClick(event) {
  alert(event.target.id);

  if (event.target.id == "download"){
        console.log("yp")
     download();
     }

  if (event.target.id == "ar"){
     //console.log("AR")
     downloadAR();
     }
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
    console.log(arraybuffer);
    //const blob = new Blob( [ arraybuffer ], { type: 'application/octet-stream' } );
    saveArrayBuffer(arraybuffer, 'scene.usdz')
    
  
}




//         const arraybuffer = exporter.parse( scene.children[0]);
//         const blob = new Blob( [ arraybuffer ], { type: 'application/octet-stream' } );
//         //console.log(arraybuffer)
//         saveArrayBuffer(arraybuffer, arfile.usdz)

// }





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
        renderer.toneMappingExposure = 0.5;
        container.appendChild( renderer.domElement );


        window.addEventListener( 'resize', onWindowResize );

        // stats = new Stats();
        // container.appendChild( stats.dom );

        //
        const aspect = window.innerWidth / window.innerHeight;
        camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 0.1, 1000 );
         //camera.position.set(-8,.5,0);
        camera.position.z = 5;

        controls = new OrbitControls( camera, container );
        controls.target.set( .5, 0.5, 0 );
        controls.update();

        const pmremGenerator = new THREE.PMREMGenerator( renderer );

        scene = new THREE.Scene();
        //scene.background = new THREE.Color( 0xeeeeee );
        //scene.environment = pmremGenerator.fromScene( new RoomEnvironment() ).texture;
        //scene.fog = new THREE.Fog( 0xeeeeee, 10, 50 );

        grid = new THREE.GridHelper( 100, 40, 0xffffff, 0xffffff );
        grid.position.y = -.7;
        grid.material.opacity = 0.1;
        grid.material.depthWrite = false;
        grid.material.transparent = true;
        //scene.add( grid );

        //hdr
        // new RGBELoader()
         
        //   .load( "./assets/quarry_2k.hdr", function ( texture ) {
          
        //   var enviro = pmremGenerator.fromEquirectangular( texture ).texture;

        //   //scene.background = enviro;
        //   scene.environment = enviro;
        //   //ivoryMaterial.envMap = enviro;
        //  // ivoryMaterial.envMapIntensity

        //   })

const textureLoader = new THREE.TextureLoader();

        textureEquirec = textureLoader.load( './assets/2294472375_24a3b8ef46_o.jpg' );
        textureEquirec.mapping = THREE.EquirectangularReflectionMapping;
        textureEquirec.encoding = THREE.sRGBEncoding;

        scene.environment = textureEquirec;




      //MATERIALS

  let ivoryMaterial = new THREE.MeshStandardMaterial( { 
              //map: ivoryTexture,
              //metalness: metal,
              //normalMap: nMap,
         
             } );

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
      ivoryMaterial.color.set( color.hexString );
      });


      var metalSlider = document.getElementById("metalRange");
      var output = document.getElementById("demo");
      //output.innerHTML = metalSlider.value;

      metalSlider.oninput = function() {
        //output.innerHTML = this.value;
        //console.log(slider.value)
         var metal = metalSlider.value/100;
         params.metalness = metal;
         console.log(params.metalness)
         ivoryMaterial.metalness =  params.metalness ;
           
      }

      var roughSlider = document.getElementById("roughRange");
      var output2 = document.getElementById("demo2");
      //output2.innerHTML = roughSlider.value;

      roughSlider.oninput = function() {
        //output2.innerHTML = this.value;
        //console.log(slider.value)
         var rough = roughSlider.value/100;
         params.roughness = rough;
         //console.log(params.roughness)
         ivoryMaterial.roughness =  params.roughness ;
           
      }

      var envSlider = document.getElementById("envRange");
      var output3 = document.getElementById("demo3");
      output3.innerHTML = envSlider.value;

      envSlider.oninput = function() {
        output3.innerHTML = this.value;
        //console.log(slider.value)
         var envInt = envSlider.value/50;
         params.exposure = envInt;
         //console.log(params.exposure)
         //ivoryMaterial.roughness =  params.roughness ;
          
      }


      //TEXTURES

      // const jadeTexture = new THREE.TextureLoader().load( './assets/jade_color.png' );
      // jadeTexture.flipY=false
      //const jadeMaterial = new THREE.MeshStandardMaterial( { map: jadeTexture, roughness: roughMap, } );


      //const ivoryTexture = new THREE.TextureLoader().load( './assets/ivorycombined4.png' );
      //ivoryTexture.flipY=false
      //ivoryTexture.needsUpdate = true;

      
      //const nMap = new THREE.TextureLoader().load( './assets/normal.bmp' );
      // const roughMap = new THREE.TextureLoader().load( './assets/ivorybake3_rough.png' );
      // const colorMap = new THREE.TextureLoader().load( './assets/ivorybake3_color.png' );
       

      // immediately use the texture for material creation
        // let ivoryMaterial = new THREE.MeshStandardMaterial( { 
        //       //map: ivoryTexture,
        //       //metalness: metal,
        //       //normalMap: nMap,
         
        //      } );

       




      // TURTLE MODEL LOADER

        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath( 'js/libs/draco/gltf/' );


        const loader = new GLTFLoader();
        loader.setDRACOLoader( dracoLoader );
        loader.load( './assets/smallturtle-normal.glb', function ( gtlf ) {

           //const fullmodel = gtlf.scene//.children[0].children[0].geometry//.children[0].geometry;
           const model = gtlf.scene.children[0].geometry//.children[0].geometry;
           //console.log(model)
           let turtleMesh = new THREE.Mesh( model, ivoryMaterial );
           turtleMesh.name = 'turtle';
           turtleMesh.position.y = -.5
           turtleMesh.rotation.y = Math.PI / 4;
           scene.add( turtleMesh );




         



        } );



        // lights

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


   