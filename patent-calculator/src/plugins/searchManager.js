import elasticsearch from "elasticsearch"

export default class SearchManager {
  constructor() {
    const HOST = 'ec2-13-125-38-231.ap-northeast-2.compute.amazonaws.com:9200';
    this.esclient = new elasticsearch.Client({
      host: HOST
    })
  }

  trimKeywords(csv) {
    return [...new Set(csv.split(/[,]+[\s]*/).filter(word => word.length > 0))]
  }

  buildQueryString(classification, keywords) {
    let queryString = this.trimKeywords(keywords).map((keyword) => { return '"' + keyword + '"' }).join(" ")
    queryString = classification > 0 ? "NICE분류:" + classification + " AND (" + queryString + ")" : queryString
    return { query_string: { query: queryString } }
  }

  async search(classification, keywords) {
    const queryString = this.buildQueryString(classification, keywords)

    let searchResult = []
    let responseQueue = []
    const batchSize = 10000;
    responseQueue.push(
      await this.esclient.search({
        index: 'products',
        scroll: "1m",
        size: batchSize,
        body: {
          query: queryString
        }
      }))

    while (responseQueue.length) {
      const response = responseQueue.shift()
      searchResult = searchResult.concat(response.hits.hits)
      if (searchResult.length === response.hits.total) {
        break;
      }
      responseQueue.push(
        await this.esclient.scroll({
          scrollId: response._scroll_id,
          scroll: '1m',
        })
      );
    }

    return searchResult.reduce((acc, val) => {
      acc.push(Object.assign({}, { id: parseInt(val._id) }, val._source, { "고시명칭": true }))
      return acc
    }, [])
  }
}
