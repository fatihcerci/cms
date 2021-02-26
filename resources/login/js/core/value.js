var pValueFactory = {};
pValueFactory.newValueHolder = function(config) {

    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }


    var pValueHolder = {};
    pValueHolder.holders=new Array();
    pValueHolder.valueMap = {};
    pValueHolder.lastMessage = "";



    /*================================================================
    * HOLDER
    =================================================================*/

    function Holder(name) {
        this.name = name;
        this.uuid = guid();
        this.values = new Array();
    }


    pValueHolder.addHolder = function(name) {
        var holder = new Holder(name);
        pValueHolder.holders.push(holder);
        return holder;
    };


    pValueHolder.getHolder = function(uuid) {
        var holders = pValueHolder.holders
        for (var i = 0; i < holders.length; i++) {
            if (holders[i].uuid === uuid) {
                return holders[i];
            }
        }
    }

    pValueHolder.getHolderIndex = function(uuid) {
        var holders = pValueHolder.holders
        for (var i = 0; i < holders.length; i++) {
            if (holders[i].uuid === uuid) {
                return i;
            }
        }
    };


    pValueHolder.listHolder = function() {
        return pValueHolder.holders;
    };

    pValueHolder.updateHolder = function(uuid, params) {
        if (params == null) return;

        var holder = this.getHolder(uuid);
        if (holder === null) return;

        if (params.hasOwnProperty('name')) {
            holder.name = params.name;
        }

    };


    pValueHolder.deleteHolder = function(uuid) {
        var holderIndex = pValueHolder.getHolderIndex(uuid);
        pValueHolder.holders.splice(holderIndex, 1);
    };


    /*================================================================
    * VALUES
    =================================================================*/

    function Value(holderUUID, name) {
        this.name = name;
        this.uuid = guid();
        this.holderUUID = holderUUID;
    }

    pValueHolder.addValue = function(holderUUID, name) {
        var value = new Value(holderUUID, name);
        var holder = this.getHolder(holderUUID);
        holder.values.push(value);
        pValueHolder.valueMap[value.uuid] = value;
        return value;
    };



    pValueHolder.getValue = function(uuid) {
        return pValueHolder.valueMap[uuid];
    };

    pValueHolder.getValueIndex = function(holderUUID, uuid) {
        var holder = this.getHolder(holderUUID);
        var values = holder.values;
        for (var i = 0; i < values.length; i++) {
            if (values[i].uuid === uuid) {
                return i;
            }
        }
    };

    pValueHolder.listValue = function(holderUUID) {
        var holder = this.getHolder(holderUUID);
        return holder.values;
    };

    pValueHolder.updateValue = function(uuid, params) {
        if (params == null) return;

        var value = pValueHolder.valueMap[uuid];
        if (value == null) return;

        if (params.hasOwnProperty('name')) {
            value.name = params.name;
        }

    };

    pValueHolder.deleteValue = function(uuid) {
        var value = pValueHolder.valueMap[uuid];
        var holder = this.getHolder(value.holderUUID);
        var valueIndex = this.getValueIndex(value.holderUUID, uuid);
        holder.values.splice(valueIndex, 1);
        delete pValueHolder.valueMap[uuid];
    };


    /*================================================================
    *PERSIST
    =================================================================*/
    pValueHolder.toJSON = function(email) {
        var obj = { version: "0.0.4", username: email, data:pValueHolder.holders, lastMessage: pValueHolder.lastMessage};
        return JSON.stringify(obj);

    }

    pValueHolder.fromJSON = function(valueObj) {
        pValueHolder.holders = valueObj;
        for (var i = 0; i < valueObj.length; i++) {
            var holder = valueObj[i];
            for (var j = 0; j < holder.values.length; j++) {
                var value = holder.values[j];
                pValueHolder.valueMap[value.uuid] = value;
            }
        }
    }



    return pValueHolder;

}