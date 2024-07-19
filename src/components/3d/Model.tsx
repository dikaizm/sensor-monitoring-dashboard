import { useLoader } from "@react-three/fiber"
import { useEffect, useState } from "react"
import { Mesh, Object3D } from "three"
import { MTLLoader, OBJLoader } from "three/examples/jsm/Addons.js"

type ModelType = {
  objPath: string
  mtlPath: string
}

export default function Model({ objPath, mtlPath }: ModelType) {
  const [obj, setObj] = useState<Object3D>()

  const mtl = useLoader(MTLLoader, mtlPath)
  mtl.preload()

  useEffect(() => {
    const loadModel = async () => {
      const obj = new OBJLoader()
      obj.setMaterials(mtl)

      const loadedObj = await new Promise<Object3D>((resolve) => {
        obj.load(objPath, (o) => {
          resolve(o);
        });
      });

      loadedObj.castShadow = true;
      // loadedObj.receiveShadow = true;
      loadedObj.traverse((c) => {
        if (c instanceof Mesh) {
          c.castShadow = true;
          // c.receiveShadow = true;
        }
      })

      setObj(loadedObj);
    }

    loadModel()
  }, [objPath, mtl])

  return obj ? <primitive object={obj} /> : null
}
