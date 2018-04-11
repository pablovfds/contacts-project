/**
 * 201 (Created) Response
 * Successful creation occurred (via either POST or PUT).
 * Set the Location header to contain a link
 * to the newly-created resource (on POST).
 * Response body content may or may not be present.
 */
module.exports = function (data, code, message, root) {
  const response = _.assign({
    code: code || 'CREATED',
    data: data || {}
  }, root);

  if (message) {
    response.message = message
  }

  this.req._sails.log.silly('Sent (201 CREATED)\n', response);

  this.res.status(code);
  this.res.jsonx(response);
};
