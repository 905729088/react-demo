import React from 'react';
import * as THREE from 'three';

export default class Waves extends React.Component { 
    constructor(props) { 
        super(props);
        this.timer = null;
        
    }
    componentDidMount() { 
        var SEPARATION = 100,
        AMOUNTX = 100,
        AMOUNTY = 70;

         var container = document.getElementById('waves');
         var camera, scene, renderer;

         var particles, particle, count = 0;

        var mouseX = 85,
            mouseY = -342;
        

       
        
        
        init();
        
        let animate = () => { 
            this.timer=requestAnimationFrame(animate);
            myrender();
        };
        animate();
        function init() { 
            
            camera = new THREE.PerspectiveCamera(120, window.innerWidth / window.innerHeight, 1, 10000);
            camera.position.z = 1000;

            scene = new THREE.Scene();

            particles = new Array();

            var PI2 = Math.PI * 2;
           var material = new THREE.ParticleCanvasMaterial({

                color: 0x999999,
                program: function(context) {

                    context.beginPath();
                    context.arc(0, 0, .6, 0, PI2, true);
                    context.fill();

                }

            });

             var i = 0;

            for (var ix = 0; ix < AMOUNTX; ix++) {

                for (var iy = 0; iy < AMOUNTY; iy++) {

                    particle = particles[i++] = new THREE.Particle(material);
                    particle.position.x = ix * SEPARATION - ((AMOUNTX * SEPARATION) / 2);
                    particle.position.z = iy * SEPARATION - ((AMOUNTY * SEPARATION) / 2);
                    scene.add(particle);

                }

            }
            renderer = new THREE.CanvasRenderer();
            renderer.setSize(container.offsetWidth, container.offsetHeight);
            container.appendChild(renderer.domElement);
        }


      

        function myrender() {

            camera.position.x += (mouseX - camera.position.x) * .05;
            camera.position.y =400;
           
            camera.lookAt(scene.position);
    
            var i = 0;
    
            for (var ix = 0; ix < AMOUNTX; ix++) {
    
                for (var iy = 0; iy < AMOUNTY; iy++) {
    
                    particle = particles[i++];
                    particle.position.y = (Math.sin((ix + count) * 0.3) * 50) + (Math.sin((iy + count) * 0.5) * 50);
                    particle.scale.x = particle.scale.y = (Math.sin((ix + count) * 0.3) + 1) * 2 + (Math.sin((iy + count) * 0.5) + 1) * 2;
    
                }
    
            }
    
            renderer.render(scene, camera);
    
            count += 0.1;
    
        }


    }

    componentWillUnmount() {
        cancelAnimationFrame(this.timer);
    }
    render() { 
        const styles = Waves.styles;
        return (
            <div id ='waves' style={styles.background}>
            </div>
        )
    }
}

 Waves.styles = {
    background: {
        position: 'fixed',
        zIndex:'-1',
        top:'280px',
        width:'100%',
        height: '780px',
    },
}