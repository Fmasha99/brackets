module.exports = function check(str, bracketsConfig) {
    var log = false;
    var firstBracket = str[0];
    var secondBracket = findSecondBracket(bracketsConfig, firstBracket)
    var expression = findExpr(str, secondBracket);

    if (expression == null) {
        return false;
    }

    if (expression == str) {
        var subExpr = removeScopes(str);

        if (subExpr == '' || subExpr == null) {
            return true;
        } else {
            return check(subExpr, bracketsConfig);
        }
    } else {
        str = str.substring(expression.length, str.lenght);
        var subExpr = removeScopes(expression, secondBracket);
        if (subExpr != '') {
            return check(str, bracketsConfig) && check(subExpr, bracketsConfig);
        } else {
          return check(str, bracketsConfig);
        }
    }
}

function removeStr(str_to_remove, str) {
    let reg = new RegExp(str_to_remove)
    return str.replace(reg, '')
}

function removeScopes(str) {
    var opening = str[0];
    var closing = str[str.length - 1];
    var index;
    for (var i = 0; i < str.length; i++) {
        if (str[i] != opening || str[str.length - 1 - i] != closing) {
          index = i;
          break;
        }
    }

    return str.substring(index, str.length - index);
}

function findExpr(str, closing) {
    var opening = str[0];
    var indexOfClosing;
    var openingCount = 0;
    if (opening != closing) {
      for (var i = 0; i < str.length; i++) {
          if (str[i] == opening) {
              openingCount++;
          } else if (str[i] == closing) {
             openingCount--;
             if (openingCount == 0) {
                indexOfClosing = i;
                break;
            }
        }
      }
    } else {
          for (var i = 1; i < str.length; i++) {
            if (str[i] == opening) {
              indexOfClosing = i;
            }
          }
      }

    if (indexOfClosing == null) {
       return null;
    }

    return str.substr(0, indexOfClosing + 1);
}

function findSecondBracket(config, el) {
    for (var i = 0; i < config.length; i++) {
        if (config[i][0] == el) {
            return config[i][1];
        }
    }
}
