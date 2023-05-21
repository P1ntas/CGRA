#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler1;

void main() {
    vec4 texColor = texture2D(uSampler, vTextureCoord);

    if (texColor.a < 1.0) discard;
    
    gl_FragColor = texColor;
}