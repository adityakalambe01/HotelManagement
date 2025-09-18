// ==================== Logger Helpers ====================
exports.header = (title = "") => {
    const startTime = new Date();
    console.log(`\n[${startTime.toLocaleTimeString()}] 🔹 START: ${title}`);
    console.log("=".repeat(60));
    return startTime; // return start time so footer can use it
}

exports.footer = (title = "", startTime) => {
    const endTime = new Date();
    const duration = ((endTime - startTime) / 1000).toFixed(2); // in seconds
    console.log("=".repeat(60));
    console.log(`[${endTime.toLocaleTimeString()}] ✅ END: ${title} (took ${duration}s)\n`);
}


exports.wipeHeader= (title = "") => {
    const startTime = new Date();
    console.log(`\n╔══════════════════ WIPING: ${title} ══════════════════╗`);
    return startTime;
}

exports.wipeFooter = (title = "", startTime) => {
    const endTime = new Date();
    const duration = ((endTime - startTime) / 1000).toFixed(2);
    console.log(`╚══════════════════ FINISHED WIPING: ${title} (took ${duration}s) ══════════════════╝\n`);
}
