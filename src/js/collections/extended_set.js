class ExtendedSet extends Set {

    update(objects) {
        let obj;
        for (obj of objects) {
            this.add(obj)
        }
    }

    diff_update(objects) {
        let obj;
        for (obj of objects) {
            this.delete(obj)
        }
    }
}

ExtendedSet.union = function (...extended_sets) {
    let result = new ExtendedSet();
    let extended_set;
    for (extended_set of extended_sets) {
        result.update(extended_set)
    }
    return result
};

ExtendedSet.intersect = function (base_set, ...extended_sets) {
    let result = new ExtendedSet(base_set);
    let extended_set;
    for (extended_set of extended_sets) {
        let obj;
        for (obj of result) {
            if (!extended_set.has(obj)) {
                result.delete(obj)
            }
        }
    }
    return result
};


module.exports = ExtendedSet;