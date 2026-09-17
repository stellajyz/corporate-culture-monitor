# -*- coding: utf-8 -*-
"""
ID, Tag, Author, Content, Score, Time, Depth, Parent_ID

 Tag     <- Submission_ID
 ID      <- ID
 Author  <- Author
 Content <- Body
 Score   <- Score
 Time    <- Created_Time
 Depth   <- Depth
 Parent_ID <- Parent_ID
"""

import csv
from pathlib import Path

SRC = Path("crawler/reddit-crawler-master/comments.csv")                  
OUT = Path("crawler/reddit-crawler-master/comments_cleaned_keep8.csv")  

required = [
    "ID", "Submission_ID", "Author", "Body", "Score",
    "Created_Time", "Depth", "Parent_ID"
]

with SRC.open("r", encoding="utf-8-sig", newline="") as f_in:
    reader = csv.DictReader(f_in)

    hdr = [h.strip() for h in (reader.fieldnames or [])]
    miss = [c for c in required if c not in hdr]
    if miss:
        raise SystemExit(f" comments.csv lack：{miss}\n result：{hdr}")

    with OUT.open("w", encoding="utf-8", newline="") as f_out:
        writer = csv.DictWriter(
            f_out,
            fieldnames=["ID","Tag","Author","Content","Score","Time","Depth","Parent_ID"],
            quoting=csv.QUOTE_ALL
        )
        writer.writeheader()

        n = 0
        for row in reader:
            row = { (k.strip() if k else k): v for k, v in row.items() }
            writer.writerow({
                "ID":        row.get("ID",""),
                "Tag":       row.get("Submission_ID",""),
                "Author":    row.get("Author",""),
                "Content":   row.get("Body",""),
                "Score":     row.get("Score",""),
                "Time":      row.get("Created_Time",""),
                "Depth":     row.get("Depth",""),
                "Parent_ID": row.get("Parent_ID",""),
            })
            n += 1

print(f"{OUT} {n} ")
print("ID, Tag, Author, Content, Score, Time, Depth, Parent_ID")
