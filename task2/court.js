function courtNaive(myName, judges, others) {
    // Just throwing everyone in an array and sorting it so 
    const allNames = [myName, ...others.split(' ')];
    allNames.sort();
    const position = allNames.indexOf(myName);
    return Math.ceil((position + 1) / judges) * 30;
}