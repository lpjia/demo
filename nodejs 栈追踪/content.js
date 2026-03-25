function content(opts, c = 20) {
  // return --c ? content(opts, c) : opts.ohoh

  function produce(cb) {
    if (--c) setTimeout(produce, 10, cb);
    cb(null, opts.ohoh)
  }
  produce()
}

module.exports = content