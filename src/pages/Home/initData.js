const InitData = { "cells": [{ "type": "standard.Circle", "position": { "x": 350, "y": 50 }, "size": { "width": 60, "height": 60 }, "angle": 0, "id": "645a26e1-a177-43e5-b55c-cee0cff443eb", "z": 1, "attrs": { "body": { "stroke": "#f90", "fill": "#f90" }, "label": { "fill": "white", "text": "开始" }, "root": { "title": "开始节点" } } }, { "type": "standard.Rectangle", "position": { "x": 330, "y": 180 }, "size": { "width": 100, "height": 40 }, "angle": 0, "id": "49009f87-fd4d-4f9e-a368-57becd144c10", "z": 2, "attrs": { "body": { "stroke": "#1c7fd0", "fill": "#40a9ff", "rx": 4, "ry": 4 }, "label": { "fill": "white", "text": "模型" } } }, { "type": "standard.Polygon", "position": { "x": 340, "y": 300 }, "size": { "width": 80, "height": 60 }, "angle": 0, "id": "80c1b2e5-23db-4dfc-85b9-b8655f795c0e", "z": 3, "attrs": { "body": { "refPoints": "0,10 10,0 20,10 10,20", "stroke": "#26368e", "fill": "#3F51B5" }, "label": { "fill": "white", "text": "判断" } } }, { "type": "html.Element", "position": { "x": 230, "y": 420 }, "size": { "width": 100, "height": 30 }, "angle": 0, "mytip": "自", "mylabel": "自定义节点", "id": "11a5efab-0b4e-4fd0-b1e0-726dbecab995", "z": 4, "attrs": {} }, { "type": "html.Element", "position": { "x": 440, "y": 420 }, "size": { "width": 100, "height": 30 }, "angle": 0, "mytip": "自", "mylabel": "自定义节点", "id": "4da5b525-900c-49ad-af71-27be4c0e7cbc", "z": 4, "attrs": {} }, { "type": "lb.CustomLink", "defaultLabel": { "markup": [{ "tagName": "rect", "selector": "body" }, { "tagName": "text", "selector": "label" }], "attrs": { "label": { "text": "%", "fill": "#000000", "fontSize": 14, "textAnchor": "middle", "yAlignment": "middle", "pointerEvents": "none" }, "body": { "ref": "label", "fill": "#ffffff", "refWidth": "100%", "refHeight": "100%", "rx": 3, "ry": 3, "xAlignment": "middle", "yAlignment": "middle" } }, "position": { "distance": 0.5, "offset": 0, "args": { "absoluteOffset": true } } }, "source": { "id": "645a26e1-a177-43e5-b55c-cee0cff443eb" }, "target": { "id": "49009f87-fd4d-4f9e-a368-57becd144c10" }, "toolMarkup": "<g class='link-tool'><g class='tool-remove' event='remove'><circle r='11' /><path transform='scale(.8) translate(-16, -16)' d='M24.778,21.419 19.276,15.917 24.777,10.415 21.949,7.585 16.447,13.087 10.945,7.585 8.117,10.415 13.618,15.917 8.116,21.419 10.946,24.248 16.447,18.746 21.948,24.248z' /><title>Remove link.</title></g><g event='link:options'><circle r='11' transform='translate(25)' /><path fill='white' transform='scale(.55) translate(29, -16)' d='M31.229,17.736c0.064-0.571,0.104-1.148,0.104-1.736s-0.04-1.166-0.104-1.737l-4.377-1.557c-0.218-0.716-0.504-1.401-0.851-2.05l1.993-4.192c-0.725-0.91-1.549-1.734-2.458-2.459l-4.193,1.994c-0.647-0.347-1.334-0.632-2.049-0.849l-1.558-4.378C17.165,0.708,16.588,0.667,16,0.667s-1.166,0.041-1.737,0.105L12.707,5.15c-0.716,0.217-1.401,0.502-2.05,0.849L6.464,4.005C5.554,4.73,4.73,5.554,4.005,6.464l1.994,4.192c-0.347,0.648-0.632,1.334-0.849,2.05l-4.378,1.557C0.708,14.834,0.667,15.412,0.667,16s0.041,1.165,0.105,1.736l4.378,1.558c0.217,0.715,0.502,1.401,0.849,2.049l-1.994,4.193c0.725,0.909,1.549,1.733,2.459,2.458l4.192-1.993c0.648,0.347,1.334,0.633,2.05,0.851l1.557,4.377c0.571,0.064,1.148,0.104,1.737,0.104c0.588,0,1.165-0.04,1.736-0.104l1.558-4.377c0.715-0.218,1.399-0.504,2.049-0.851l4.193,1.993c0.909-0.725,1.733-1.549,2.458-2.458l-1.993-4.193c0.347-0.647,0.633-1.334,0.851-2.049L31.229,17.736zM16,20.871c-2.69,0-4.872-2.182-4.872-4.871c0-2.69,2.182-4.872,4.872-4.872c2.689,0,4.871,2.182,4.871,4.872C20.871,18.689,18.689,20.871,16,20.871z' /><title>Link options.</title></g></g>", "id": "bd352fac-d1ee-45eb-8e4e-0eaa28016d10", "z": 5, "attrs": {} }, { "type": "standard.Circle", "position": { "x": 250, "y": 560 }, "size": { "width": 60, "height": 60 }, "angle": 0, "id": "1fdd036d-c237-4fe5-bfb2-3f4067f5778c", "z": 5, "attrs": { "body": { "stroke": "rgb(134, 159, 190)", "fill": "rgb(134, 159, 190)" }, "label": { "fill": "white", "text": "结束" }, "root": { "title": "结束节点" } } }, { "type": "standard.Circle", "position": { "x": 460, "y": 560 }, "size": { "width": 60, "height": 60 }, "angle": 0, "id": "f01725ae-5a79-41b9-a66e-f15ab6512a63", "z": 5, "attrs": { "body": { "stroke": "rgb(134, 159, 190)", "fill": "rgb(134, 159, 190)" }, "label": { "fill": "white", "text": "结束" }, "root": { "title": "结束节点" } } }, { "type": "lb.CustomLink", "defaultLabel": { "markup": [{ "tagName": "rect", "selector": "body" }, { "tagName": "text", "selector": "label" }], "attrs": { "label": { "text": "%", "fill": "#000000", "fontSize": 14, "textAnchor": "middle", "yAlignment": "middle", "pointerEvents": "none" }, "body": { "ref": "label", "fill": "#ffffff", "refWidth": "100%", "refHeight": "100%", "rx": 3, "ry": 3, "xAlignment": "middle", "yAlignment": "middle" } }, "position": { "distance": 0.5, "offset": 0, "args": { "absoluteOffset": true } } }, "source": { "id": "49009f87-fd4d-4f9e-a368-57becd144c10" }, "target": { "id": "80c1b2e5-23db-4dfc-85b9-b8655f795c0e" }, "toolMarkup": "<g class='link-tool'><g class='tool-remove' event='remove'><circle r='11' /><path transform='scale(.8) translate(-16, -16)' d='M24.778,21.419 19.276,15.917 24.777,10.415 21.949,7.585 16.447,13.087 10.945,7.585 8.117,10.415 13.618,15.917 8.116,21.419 10.946,24.248 16.447,18.746 21.948,24.248z' /><title>Remove link.</title></g><g event='link:options'><circle r='11' transform='translate(25)' /><path fill='white' transform='scale(.55) translate(29, -16)' d='M31.229,17.736c0.064-0.571,0.104-1.148,0.104-1.736s-0.04-1.166-0.104-1.737l-4.377-1.557c-0.218-0.716-0.504-1.401-0.851-2.05l1.993-4.192c-0.725-0.91-1.549-1.734-2.458-2.459l-4.193,1.994c-0.647-0.347-1.334-0.632-2.049-0.849l-1.558-4.378C17.165,0.708,16.588,0.667,16,0.667s-1.166,0.041-1.737,0.105L12.707,5.15c-0.716,0.217-1.401,0.502-2.05,0.849L6.464,4.005C5.554,4.73,4.73,5.554,4.005,6.464l1.994,4.192c-0.347,0.648-0.632,1.334-0.849,2.05l-4.378,1.557C0.708,14.834,0.667,15.412,0.667,16s0.041,1.165,0.105,1.736l4.378,1.558c0.217,0.715,0.502,1.401,0.849,2.049l-1.994,4.193c0.725,0.909,1.549,1.733,2.459,2.458l4.192-1.993c0.648,0.347,1.334,0.633,2.05,0.851l1.557,4.377c0.571,0.064,1.148,0.104,1.737,0.104c0.588,0,1.165-0.04,1.736-0.104l1.558-4.377c0.715-0.218,1.399-0.504,2.049-0.851l4.193,1.993c0.909-0.725,1.733-1.549,2.458-2.458l-1.993-4.193c0.347-0.647,0.633-1.334,0.851-2.049L31.229,17.736zM16,20.871c-2.69,0-4.872-2.182-4.872-4.871c0-2.69,2.182-4.872,4.872-4.872c2.689,0,4.871,2.182,4.871,4.872C20.871,18.689,18.689,20.871,16,20.871z' /><title>Link options.</title></g></g>", "id": "91b219b8-7a85-474b-9529-6762ee984318", "labels": [{ "attrs": { "label": { "text": "自定义线" } } }], "z": 6, "attrs": {} }, { "type": "lb.CustomLink", "defaultLabel": { "markup": [{ "tagName": "rect", "selector": "body" }, { "tagName": "text", "selector": "label" }], "attrs": { "label": { "text": "%", "fill": "#000000", "fontSize": 14, "textAnchor": "middle", "yAlignment": "middle", "pointerEvents": "none" }, "body": { "ref": "label", "fill": "#ffffff", "refWidth": "100%", "refHeight": "100%", "rx": 3, "ry": 3, "xAlignment": "middle", "yAlignment": "middle" } }, "position": { "distance": 0.5, "offset": 0, "args": { "absoluteOffset": true } } }, "source": { "id": "80c1b2e5-23db-4dfc-85b9-b8655f795c0e" }, "target": { "id": "11a5efab-0b4e-4fd0-b1e0-726dbecab995" }, "toolMarkup": "<g class='link-tool'><g class='tool-remove' event='remove'><circle r='11' /><path transform='scale(.8) translate(-16, -16)' d='M24.778,21.419 19.276,15.917 24.777,10.415 21.949,7.585 16.447,13.087 10.945,7.585 8.117,10.415 13.618,15.917 8.116,21.419 10.946,24.248 16.447,18.746 21.948,24.248z' /><title>Remove link.</title></g><g event='link:options'><circle r='11' transform='translate(25)' /><path fill='white' transform='scale(.55) translate(29, -16)' d='M31.229,17.736c0.064-0.571,0.104-1.148,0.104-1.736s-0.04-1.166-0.104-1.737l-4.377-1.557c-0.218-0.716-0.504-1.401-0.851-2.05l1.993-4.192c-0.725-0.91-1.549-1.734-2.458-2.459l-4.193,1.994c-0.647-0.347-1.334-0.632-2.049-0.849l-1.558-4.378C17.165,0.708,16.588,0.667,16,0.667s-1.166,0.041-1.737,0.105L12.707,5.15c-0.716,0.217-1.401,0.502-2.05,0.849L6.464,4.005C5.554,4.73,4.73,5.554,4.005,6.464l1.994,4.192c-0.347,0.648-0.632,1.334-0.849,2.05l-4.378,1.557C0.708,14.834,0.667,15.412,0.667,16s0.041,1.165,0.105,1.736l4.378,1.558c0.217,0.715,0.502,1.401,0.849,2.049l-1.994,4.193c0.725,0.909,1.549,1.733,2.459,2.458l4.192-1.993c0.648,0.347,1.334,0.633,2.05,0.851l1.557,4.377c0.571,0.064,1.148,0.104,1.737,0.104c0.588,0,1.165-0.04,1.736-0.104l1.558-4.377c0.715-0.218,1.399-0.504,2.049-0.851l4.193,1.993c0.909-0.725,1.733-1.549,2.458-2.458l-1.993-4.193c0.347-0.647,0.633-1.334,0.851-2.049L31.229,17.736zM16,20.871c-2.69,0-4.872-2.182-4.872-4.871c0-2.69,2.182-4.872,4.872-4.872c2.689,0,4.871,2.182,4.871,4.872C20.871,18.689,18.689,20.871,16,20.871z' /><title>Link options.</title></g></g>", "id": "eef72967-5f2f-4417-afbe-95097ae9c3d1", "labels": [{ "attrs": { "label": { "text": "自定义元素" } } }], "z": 7, "attrs": {} }, { "type": "lb.CustomLink", "defaultLabel": { "markup": [{ "tagName": "rect", "selector": "body" }, { "tagName": "text", "selector": "label" }], "attrs": { "label": { "text": "%", "fill": "#000000", "fontSize": 14, "textAnchor": "middle", "yAlignment": "middle", "pointerEvents": "none" }, "body": { "ref": "label", "fill": "#ffffff", "refWidth": "100%", "refHeight": "100%", "rx": 3, "ry": 3, "xAlignment": "middle", "yAlignment": "middle" } }, "position": { "distance": 0.5, "offset": 0, "args": { "absoluteOffset": true } } }, "source": { "id": "11a5efab-0b4e-4fd0-b1e0-726dbecab995" }, "target": { "id": "1fdd036d-c237-4fe5-bfb2-3f4067f5778c" }, "toolMarkup": "<g class='link-tool'><g class='tool-remove' event='remove'><circle r='11' /><path transform='scale(.8) translate(-16, -16)' d='M24.778,21.419 19.276,15.917 24.777,10.415 21.949,7.585 16.447,13.087 10.945,7.585 8.117,10.415 13.618,15.917 8.116,21.419 10.946,24.248 16.447,18.746 21.948,24.248z' /><title>Remove link.</title></g><g event='link:options'><circle r='11' transform='translate(25)' /><path fill='white' transform='scale(.55) translate(29, -16)' d='M31.229,17.736c0.064-0.571,0.104-1.148,0.104-1.736s-0.04-1.166-0.104-1.737l-4.377-1.557c-0.218-0.716-0.504-1.401-0.851-2.05l1.993-4.192c-0.725-0.91-1.549-1.734-2.458-2.459l-4.193,1.994c-0.647-0.347-1.334-0.632-2.049-0.849l-1.558-4.378C17.165,0.708,16.588,0.667,16,0.667s-1.166,0.041-1.737,0.105L12.707,5.15c-0.716,0.217-1.401,0.502-2.05,0.849L6.464,4.005C5.554,4.73,4.73,5.554,4.005,6.464l1.994,4.192c-0.347,0.648-0.632,1.334-0.849,2.05l-4.378,1.557C0.708,14.834,0.667,15.412,0.667,16s0.041,1.165,0.105,1.736l4.378,1.558c0.217,0.715,0.502,1.401,0.849,2.049l-1.994,4.193c0.725,0.909,1.549,1.733,2.459,2.458l4.192-1.993c0.648,0.347,1.334,0.633,2.05,0.851l1.557,4.377c0.571,0.064,1.148,0.104,1.737,0.104c0.588,0,1.165-0.04,1.736-0.104l1.558-4.377c0.715-0.218,1.399-0.504,2.049-0.851l4.193,1.993c0.909-0.725,1.733-1.549,2.458-2.458l-1.993-4.193c0.347-0.647,0.633-1.334,0.851-2.049L31.229,17.736zM16,20.871c-2.69,0-4.872-2.182-4.872-4.871c0-2.69,2.182-4.872,4.872-4.872c2.689,0,4.871,2.182,4.871,4.872C20.871,18.689,18.689,20.871,16,20.871z' /><title>Link options.</title></g></g>", "id": "4ee09f6e-a32c-4488-9be0-58f567c129ec", "z": 8, "attrs": {} }, { "type": "lb.CustomLink", "defaultLabel": { "markup": [{ "tagName": "rect", "selector": "body" }, { "tagName": "text", "selector": "label" }], "attrs": { "label": { "text": "%", "fill": "#000000", "fontSize": 14, "textAnchor": "middle", "yAlignment": "middle", "pointerEvents": "none" }, "body": { "ref": "label", "fill": "#ffffff", "refWidth": "100%", "refHeight": "100%", "rx": 3, "ry": 3, "xAlignment": "middle", "yAlignment": "middle" } }, "position": { "distance": 0.5, "offset": 0, "args": { "absoluteOffset": true } } }, "source": { "id": "80c1b2e5-23db-4dfc-85b9-b8655f795c0e" }, "target": { "id": "4da5b525-900c-49ad-af71-27be4c0e7cbc" }, "toolMarkup": "<g class='link-tool'><g class='tool-remove' event='remove'><circle r='11' /><path transform='scale(.8) translate(-16, -16)' d='M24.778,21.419 19.276,15.917 24.777,10.415 21.949,7.585 16.447,13.087 10.945,7.585 8.117,10.415 13.618,15.917 8.116,21.419 10.946,24.248 16.447,18.746 21.948,24.248z' /><title>Remove link.</title></g><g event='link:options'><circle r='11' transform='translate(25)' /><path fill='white' transform='scale(.55) translate(29, -16)' d='M31.229,17.736c0.064-0.571,0.104-1.148,0.104-1.736s-0.04-1.166-0.104-1.737l-4.377-1.557c-0.218-0.716-0.504-1.401-0.851-2.05l1.993-4.192c-0.725-0.91-1.549-1.734-2.458-2.459l-4.193,1.994c-0.647-0.347-1.334-0.632-2.049-0.849l-1.558-4.378C17.165,0.708,16.588,0.667,16,0.667s-1.166,0.041-1.737,0.105L12.707,5.15c-0.716,0.217-1.401,0.502-2.05,0.849L6.464,4.005C5.554,4.73,4.73,5.554,4.005,6.464l1.994,4.192c-0.347,0.648-0.632,1.334-0.849,2.05l-4.378,1.557C0.708,14.834,0.667,15.412,0.667,16s0.041,1.165,0.105,1.736l4.378,1.558c0.217,0.715,0.502,1.401,0.849,2.049l-1.994,4.193c0.725,0.909,1.549,1.733,2.459,2.458l4.192-1.993c0.648,0.347,1.334,0.633,2.05,0.851l1.557,4.377c0.571,0.064,1.148,0.104,1.737,0.104c0.588,0,1.165-0.04,1.736-0.104l1.558-4.377c0.715-0.218,1.399-0.504,2.049-0.851l4.193,1.993c0.909-0.725,1.733-1.549,2.458-2.458l-1.993-4.193c0.347-0.647,0.633-1.334,0.851-2.049L31.229,17.736zM16,20.871c-2.69,0-4.872-2.182-4.872-4.871c0-2.69,2.182-4.872,4.872-4.872c2.689,0,4.871,2.182,4.871,4.872C20.871,18.689,18.689,20.871,16,20.871z' /><title>Link options.</title></g></g>", "id": "9e169ebd-f924-49c6-9516-427a1e2fefc0", "z": 9, "attrs": {} }, { "type": "lb.CustomLink", "defaultLabel": { "markup": [{ "tagName": "rect", "selector": "body" }, { "tagName": "text", "selector": "label" }], "attrs": { "label": { "text": "%", "fill": "#000000", "fontSize": 14, "textAnchor": "middle", "yAlignment": "middle", "pointerEvents": "none" }, "body": { "ref": "label", "fill": "#ffffff", "refWidth": "100%", "refHeight": "100%", "rx": 3, "ry": 3, "xAlignment": "middle", "yAlignment": "middle" } }, "position": { "distance": 0.5, "offset": 0, "args": { "absoluteOffset": true } } }, "source": { "id": "4da5b525-900c-49ad-af71-27be4c0e7cbc" }, "target": { "id": "f01725ae-5a79-41b9-a66e-f15ab6512a63" }, "toolMarkup": "<g class='link-tool'><g class='tool-remove' event='remove'><circle r='11' /><path transform='scale(.8) translate(-16, -16)' d='M24.778,21.419 19.276,15.917 24.777,10.415 21.949,7.585 16.447,13.087 10.945,7.585 8.117,10.415 13.618,15.917 8.116,21.419 10.946,24.248 16.447,18.746 21.948,24.248z' /><title>Remove link.</title></g><g event='link:options'><circle r='11' transform='translate(25)' /><path fill='white' transform='scale(.55) translate(29, -16)' d='M31.229,17.736c0.064-0.571,0.104-1.148,0.104-1.736s-0.04-1.166-0.104-1.737l-4.377-1.557c-0.218-0.716-0.504-1.401-0.851-2.05l1.993-4.192c-0.725-0.91-1.549-1.734-2.458-2.459l-4.193,1.994c-0.647-0.347-1.334-0.632-2.049-0.849l-1.558-4.378C17.165,0.708,16.588,0.667,16,0.667s-1.166,0.041-1.737,0.105L12.707,5.15c-0.716,0.217-1.401,0.502-2.05,0.849L6.464,4.005C5.554,4.73,4.73,5.554,4.005,6.464l1.994,4.192c-0.347,0.648-0.632,1.334-0.849,2.05l-4.378,1.557C0.708,14.834,0.667,15.412,0.667,16s0.041,1.165,0.105,1.736l4.378,1.558c0.217,0.715,0.502,1.401,0.849,2.049l-1.994,4.193c0.725,0.909,1.549,1.733,2.459,2.458l4.192-1.993c0.648,0.347,1.334,0.633,2.05,0.851l1.557,4.377c0.571,0.064,1.148,0.104,1.737,0.104c0.588,0,1.165-0.04,1.736-0.104l1.558-4.377c0.715-0.218,1.399-0.504,2.049-0.851l4.193,1.993c0.909-0.725,1.733-1.549,2.458-2.458l-1.993-4.193c0.347-0.647,0.633-1.334,0.851-2.049L31.229,17.736zM16,20.871c-2.69,0-4.872-2.182-4.872-4.871c0-2.69,2.182-4.872,4.872-4.872c2.689,0,4.871,2.182,4.871,4.872C20.871,18.689,18.689,20.871,16,20.871z' /><title>Link options.</title></g></g>", "id": "95c21b4a-ead6-42de-bba6-c54e60a51669", "z": 10, "attrs": {} }] };

export default InitData;
