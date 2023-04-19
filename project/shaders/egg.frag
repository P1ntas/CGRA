#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler1;
uniform sampler2D uSampler2;

const int SPOTS = 11;

void main() {
    
    vec4 texColor = texture2D(uSampler, vTextureCoord);
    
    // Define the positions of the spots
    vec2 spots[11];
    spots[0] = vec2(0.1, 0.1);
    spots[1] = vec2(0.3, 0.3);
    spots[2] = vec2(0.5, 0.7);
    spots[3] = vec2(0.7, 0.4);
    spots[4] = vec2(0.9, 0.5);
    spots[5] = vec2(0.2, 0.6);
    spots[6] = vec2(0.4, 0.8);
    spots[7] = vec2(0.6, 0.7);
    spots[8] = vec2(0.8, 0.6);
    spots[9] = vec2(0.1, 0.3);
    spots[10] = vec2(0.9, 0.4);

    // Calculate the distance between the current pixel and each spot
    for (int i = 0; i < SPOTS; i++) {
        float distance = length(vTextureCoord - spots[i]);
        // If the distance is less than a threshold, color the pixel black
        if (distance < 0.01) {
            gl_FragColor = mix(texColor, vec4(0.0, 0.0, 0.0, 1.0), 0.5);
            break;
        }
        // Otherwise, apply the texture color
        else {
            gl_FragColor = texColor;
        }
    }
}
