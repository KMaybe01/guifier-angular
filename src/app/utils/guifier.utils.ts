import { TomlDocument, TomlFormat, stringify as tomlStringify } from '@decimalturn/toml-patch'
import { XMLBuilder, XMLParser } from 'fast-xml-parser'
import { dump as dumpYaml, load as loadYaml } from 'js-yaml'
import cloneDeep from 'lodash-es/cloneDeep'

export type GuifierData = Record<string, unknown> | unknown[]
export type DataType = 'json' | 'yaml' | 'xml' | 'toml'

let currentTomlDocument: TomlDocument | null = null

export function encode(dataType: DataType, data: string): GuifierData {
  switch (dataType) {
    case 'json':
      return JSON.parse(data)
    case 'yaml':
      return loadYaml(data) as GuifierData
    case 'toml':
      currentTomlDocument = new TomlDocument(data)
      return currentTomlDocument.toJsObject as GuifierData
    case 'xml': {
      const parsedData = new XMLParser().parse(data)
      const rootNodeName = Object.keys(parsedData)[0]
      return parsedData[rootNodeName] as GuifierData
    }
    default:
      throw new Error(`The (${dataType}) is not supported in guifier (encode) function`)
  }
}

export function decode(dataType: DataType, data: GuifierData): string {
  switch (dataType) {
    case 'json':
      return JSON.stringify(data, null, 2)
    case 'yaml':
      return dumpYaml(data)
    case 'toml': {
      const processedData = cloneDeep(data)
      const format = TomlFormat.default()
      format.truncateZeroTimeInDates = true
      if (currentTomlDocument) {
        currentTomlDocument.patch(processedData, format)
        return currentTomlDocument.toTomlString
      }
      const tomlString = tomlStringify(processedData, format)
      currentTomlDocument = new TomlDocument(tomlString)
      return currentTomlDocument.toTomlString
    }
    case 'xml': {
      const returnedObject = { root: data }
      return new XMLBuilder({ format: true, indentBy: '  ', suppressEmptyNode: false }).build(
        returnedObject,
      )
    }
    default:
      throw new Error(`The (${dataType}) is not supported in guifier (decode) function`)
  }
}
