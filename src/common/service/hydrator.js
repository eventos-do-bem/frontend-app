export default class HydratorService {
  constructor() {
  }
  extract(data, fields) {
    let result = {}
    let keys = Object.keys(data)
    fields = (fields) ? fields : keys
    fields.map(field => {
      if (keys.indexOf(field)) {
        result[field] = data[field]
      }
    })
    return result
  }
}