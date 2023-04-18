#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler1;
uniform sampler2D uSampler2;

varying float alt; 

void main() {
    vec4 texColor = texture2D(uSampler, vTextureCoord);
    vec4 height = texture2D(uSampler2, vec2(0.0, -alt));
    vec4 color = mix(texColor, height, 0.3);
    
    gl_FragColor = color;
}