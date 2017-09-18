// Copyright 2017 The apla-front Authors
// This file is part of the apla-front library.
// 
// The apla-front library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// The apla-front library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser General Public License for more details.
// 
// You should have received a copy of the GNU Lesser General Public License
// along with the apla-front library. If not, see <http://www.gnu.org/licenses/>.

import FSS from './fss';

interface IFSSLight {
    ambientHex: string;
    diffuseHex: string;
    position: number[];
    setPosition: (x: number, y: number, z: number) => void;
}

export default function (container: HTMLElement) {
    // ------------------------------
    // Mesh Properties
    // ------------------------------
    const MESH = {
        width: 1.2,
        height: 1.2,
        slices: 250,
        depth: 0,
        maxdepth: 200,
        ambient: '#555555',
        diffuse: '#FFFFFF'
    };

    // ------------------------------
    // Light Properties
    // ------------------------------
    const LIGHT = {
        xPos: 0,
        yPos: 200,
        zOffset: 100,
        ambient: '#001921',
        diffuse: '#00bffa',
        pickedup: true,
        proxy: null as IFSSLight
    };

    // ------------------------------
    // Global Properties
    // ------------------------------
    var center = FSS.Vector3.create();
    var renderer: any;
    var scene: any;
    var mesh: any;
    var geometry: any;
    var material: any;

    // ------------------------------
    // Methods
    // ------------------------------
    function initialize() {
        container.innerHTML = '';
        createRenderer();
        createScene();
        createMesh();
        addLight();
        addEventListeners();
        resize(container.offsetWidth, container.offsetHeight);
        animate();
    }

    function createRenderer() {
        renderer = new FSS.CanvasRenderer();
        renderer.setSize(container.offsetWidth, container.offsetHeight);
        container.appendChild(renderer.element);
    }

    function createScene() {
        scene = new FSS.Scene();
    }

    function createMesh() {
        scene.remove(mesh);
        renderer.clear();
        geometry = new FSS.Plane(MESH.width * renderer.width, MESH.height * renderer.height, MESH.slices);
        material = new FSS.Material(MESH.ambient, MESH.diffuse);
        mesh = new FSS.Mesh(geometry, material);
        scene.add(mesh);

        // Augment vertices for depth modification
        var v, vertex;
        for (v = geometry.vertices.length - 1; v >= 0; v--) {
            vertex = geometry.vertices[v];
            vertex.depth = MESH.maxdepth / 10 * Math.random();
            vertex.anchor = FSS.Vector3.clone(vertex.position);
        }
    }

    // Add a single light
    function addLight() {
        renderer.clear();
        var light = new FSS.Light(LIGHT.ambient, LIGHT.diffuse);
        light.ambientHex = light.ambient.format();
        light.diffuseHex = light.diffuse.format();
        light.setPosition(LIGHT.xPos, LIGHT.yPos, LIGHT.zOffset);
        scene.add(light);
        LIGHT.proxy = light;
    }

    // Resize canvas
    function resize(width: number, height: number) {
        renderer.setSize(width, height);
        FSS.Vector3.set(center, renderer.halfWidth, renderer.halfHeight);
        createMesh();
    }

    function animate() {
        update();
        render();

        if (!renderer.element.parentNode) {
            return;
        }

        requestAnimationFrame(animate);
    }

    function update() {
        var v, vertex, offset = MESH.depth / 100;

        // Add depth to Vertices
        for (v = geometry.vertices.length - 1; v >= 0; v--) {
            vertex = geometry.vertices[v];
            FSS.Vector3.set(vertex.position, 1, 1, vertex.depth * offset);
            FSS.Vector3.add(vertex.position, vertex.anchor);
        }

        // Set the Geometry to dirty
        geometry.dirty = true;
    }

    function render() {
        renderer.render(scene);
    }

    function addEventListeners() {
        document.addEventListener('mousemove', onMouseMove);
    }

    function onMouseMove(event: MouseEvent) {
        LIGHT.xPos = (event.x || event.clientX) - renderer.width / 2;
        LIGHT.yPos = renderer.height / 2 - (event.y || event.clientY);
        LIGHT.proxy.setPosition(LIGHT.xPos, LIGHT.yPos, LIGHT.proxy.position[2]);
    }

    // Let there be light!
    initialize();
}