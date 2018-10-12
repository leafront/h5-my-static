window.PubSub = {};
(function (q) {
  var topics = {}, subUid = -1;
  q.publish = function (topic) {
    if(!topics[topic]){
      return false;
    }

    var subscribers = topics[topic],
      len = subscribers ? subscribers.length : 0;

    while(len--){
      var args = Array.prototype.slice.call(arguments, 1);
      args.unshift(topic);
      subscribers[len].callback.apply(this, args);
    }
    return this;
  };

  q.subscribe = function (topic, callback) {
    if(!topics[topic]){
      topics[topic] = [];
    }

    var subuid = (++subUid).toString();

    topics[topic].push({
      token: subuid,
      callback: callback
    });

    return subuid;
  };

  q.unsubscribe = function (subid) {
    for(var k in topics){
      if(topics[k]){
        for(var i = 0, j = topics[k].length; i < j; i++){
          if(topics[k][i].token === subid){
            topics[k].splice(i, 1);
            return subid;
          }
        }
      }
    }
    return this;
  };
})(PubSub);
