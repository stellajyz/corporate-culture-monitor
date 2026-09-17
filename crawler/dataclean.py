# -*- coding: utf-8 -*-
import pandas as pd
import re
import csv

SUB = "crawler/reddit-crawler-master/submissions_cleaned.csv"
COM = "crawler/reddit-crawler-master/comments_cleaned.csv"


sub = pd.read_csv(SUB, dtype=str, keep_default_na=False, encoding="utf-8-sig")
com = pd.read_csv(COM, dtype=str, keep_default_na=False, encoding="utf-8-sig")


pattern = re.compile(r"(Rio Tinto|RIO TINTO|rio tinto|Rio tinto)")


for col in ["Text", "Content"]:
    if col not in sub.columns: 
        sub[col] = ""
hit = sub["Text"].str.contains(pattern, na=False) | sub["Content"].str.contains(pattern, na=False)
sub_sel = sub[hit].copy()


post_tags = set(sub_sel["Tag"])
com_sel  = com[com["Tag"].isin(post_tags)].copy()


merged = com_sel.merge(
    sub_sel, on="Tag", how="left", suffixes=("_comment", "_post")
)


sub_out = "crawler/reddit-crawler-master/submissions_rio.csv"
com_out = "crawler/reddit-crawler-master/comments_rio.csv"
mrg_out = "crawler/reddit-crawler-master/comments_with_posts_rio.csv"

sub_sel.to_csv(sub_out, index=False, encoding="utf-8", quoting=csv.QUOTE_ALL)
com_sel.to_csv(com_out, index=False, encoding="utf-8", quoting=csv.QUOTE_ALL)
merged.to_csv(mrg_out, index=False, encoding="utf-8", quoting=csv.QUOTE_ALL)

print(f"posts matched:  {len(sub_sel)} -> {sub_out}")
print(f"comments kept:  {len(com_sel)} -> {com_out}")
print(f"merged rows:    {len(merged)} -> {mrg_out}")
