#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler1;
uniform sampler2D uSampler2;

void main() {
    vec4 texColor = texture2D(uSampler1, vTextureCoord);
    float height = texture2D(uSampler2, vTextureCoord).r;
    vec4 green = vec4(0.0, 1.0, 0.0, 1.0);
    vec4 grey = vec4(0.5, 0.5, 0.5, 1.0);
    vec4 color = mix(green, grey, height);
    
    gl_FragColor = mix(texColor, color, 0.5);
}