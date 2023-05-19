#ifdef GL_ES
precision highp float;
#endif

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform sampler2D uSampler1;

uniform vec2 treePosition;

void main() {

    vTextureCoord = vec2(treePosition.x/400.0 + 0.5, treePosition.y/400.0 + 0.5);

    vTextureCoord = aTextureCoord;

    vec3 offset = aVertexNormal * texture2D(uSampler1, vTextureCoord).b;

    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);

    /*vec2 positionOnTheHeightmap = vec2(treePosition.x/400.0 + 0.5, treePosition.y/400.0 + 0.5);

    float height = texture2D(uSampler1, positionOnTheHeightmap).b;

    gl_Position = uPMatrix * uMVMatrix * (400.0 * vec4(0.0, height, 0.0, 0.0));*/
}