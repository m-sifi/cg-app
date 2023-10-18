export const vertexShader = `

// attribute vec3 position;
// attribute vec3 normal;
// attribute vec2 uv;

varying vec3 vNormal;
varying vec3 vFragPosition; 

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
  vFragPosition = vec3(modelPosition.xyz);
  vNormal = normal;
}

`
export const fragmentShader = `
precision mediump float;

varying vec3 vNormal;
varying vec3 vFragPosition; 

uniform vec3 uMeshColor;
uniform vec3 uLightPosition;
uniform vec3 uCameraPosition; 

uniform bool uAmbient;
uniform vec3 uAmbientColor;
uniform float uAmbientIntensity;

uniform bool uDiffuse;
uniform vec3 uDiffuseColor;

uniform bool uSpecular;
uniform float uSpecularStrength;
uniform float uSpecularShininess;

void main() {
    vec3 ambient = uAmbientIntensity * uAmbientColor;
    
    vec3 norm = normalize(vNormal);
    vec3 lightDir = normalize(uLightPosition - vFragPosition);  
    float diff = max(dot(norm, lightDir), 0.0);
    vec3 diffuse = diff * uDiffuseColor;

    // specular
    vec3 viewDir = normalize(uCameraPosition - vFragPosition);
    vec3 reflectDir = reflect(-lightDir, norm);  
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), uSpecularShininess);
    vec3 specular = uSpecularStrength * spec * uDiffuseColor;  

    vec3 lighting = vec3(0.0);
    if (uAmbient) {
        lighting += ambient;
    }

    if (uDiffuse) {
        lighting += diffuse;
    }

    if (uSpecular) {
        lighting += specular;
    }
    
    vec3 result = lighting * uMeshColor;
    gl_FragColor = vec4(result, 1.0);
}
`
