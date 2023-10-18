/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { Box } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { forwardRef, use, useEffect, useMemo, useRef } from "react";
import useSWR from "swr";
import { Color, Mesh, PerspectiveCamera, ShaderMaterial } from "three";
import { vertexShader, fragmentShader } from "../glsl/lighting";

function toColor(str: string): Color {
    const cleaned = str.replace(/^#/, '');
    const hexNumber = parseInt(cleaned, 16);
    return new Color(hexNumber);
}

const AmbientCube = forwardRef<PerspectiveCamera>(({ }, ref) => {
    const mesh = useRef<Mesh>(null!)
    const material = useRef<ShaderMaterial>(null!)

    const meshProperties = useControls('Mesh Properties', {
        color: '#E9C46A'
    })

    const lightProperties = useControls('Light Properties', {
        position: [5, 5, 5],
    })

    const ambientProperties = useControls('Ambient Light', {
        enabled: true,
        color: '#FFFFFF',
        intensity: {
            value: 0.3,
            min: 0,
            max: 1,
        },
    })

    const diffuseProperties = useControls('Diffuse Light', {
        enabled: true,
        color: '#FFFFFF',
    })

    const specularProperties = useControls('Specular Light', {
        enabled: true,
        shininess: {
            value: 32,
            min: 2,
            max: 256,
        },
        intensity: {
            value: 0.5,
            min: 0,
            max: 1,
        }
    })

    const uniforms = useMemo(
        () => ({
            uMeshColor: {
                value: toColor(meshProperties.color),
            },
            uCameraPosition: {
                value: (ref as React.MutableRefObject<PerspectiveCamera>).current?.position,
            },
            uLightPosition: {
                value: lightProperties.position,
            },

            // ambient
            uAmbient: {
                value: ambientProperties.enabled,
            },
            uAmbientIntensity: {
                value: ambientProperties.intensity,
            },
            uAmbientColor: {
                value: toColor(ambientProperties.color),
            },

            // diffuse
            uDiffuse: {
                value: diffuseProperties.enabled,
            },
            uDiffuseColor: {
                value: toColor(diffuseProperties.color),
            },

            // speacular
            uSpecular: {
                value: specularProperties.enabled,
            },
            uSpecularStrength: {
                value: specularProperties.intensity,
            },
            uSpecularShininess: {
                value: specularProperties.shininess,
            },
        }), []
    );


    useEffect(() => {
        material.current.uniforms.uLightPosition.value = lightProperties.position
        // material.current.uniforms.uDiffuse.value = lightProperties.diffuse
        // material.current.uniforms.uSpecular.value = lightProperties.specular

        // material.current.uniforms.uSpecularStrength.value = lightProperties.specularStrength
        // material.current.uniforms.uLightPosition.value = lightProperties.position
        // material.current.uniforms.uLightColor.value = toColor(lightProperties.color)
    }, [lightProperties])

    useEffect(() => {
        material.current.uniforms.uAmbient.value = ambientProperties.enabled
        material.current.uniforms.uAmbientIntensity.value = ambientProperties.intensity
        material.current.uniforms.uAmbientColor.value = toColor(ambientProperties.color)
    }, [ambientProperties])

    useEffect(() => {
        material.current.uniforms.uDiffuse.value = diffuseProperties.enabled
        material.current.uniforms.uDiffuseColor.value = toColor(diffuseProperties.color)
    }, [diffuseProperties])

    useEffect(() => {
        material.current.uniforms.uSpecular.value = specularProperties.enabled
        material.current.uniforms.uSpecularStrength.value = specularProperties.intensity
        material.current.uniforms.uSpecularShininess.value = specularProperties.shininess
    }, [specularProperties])

    useEffect(() => {
        material.current.uniforms.uMeshColor.value = toColor(meshProperties.color)
    }, [meshProperties])

    useFrame((state) => {
        material.current.uniforms.uCameraPosition.value = (ref as React.MutableRefObject<PerspectiveCamera>).current?.position
    });

    return (
        <>
            <Box ref={mesh} args={[5, 5, 5]}>
                <shaderMaterial ref={material} attach='material' vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms} />
            </Box>
            <Box args={[1, 1, 1]} position={lightProperties.position}>
                <meshBasicMaterial color={toColor(diffuseProperties.color)} />
            </Box>
        </>
    )
});
AmbientCube.displayName = 'AmbientCube';

export { AmbientCube }