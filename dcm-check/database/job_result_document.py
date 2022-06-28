#!/usr/bin/python
# -*- coding: utf-8 -*-

from database.connectors import mongo


class JobResultDocument:

    @staticmethod
    def save_result_metadata(file_id, sheet_id, result_id, checks, totals, totals_per_line):
        collection = mongo.db.check_results
        collection.save({
            "_id": result_id,
            "sheet_id": sheet_id,
            "result_id": result_id,
            "file_id": file_id,
            "totals": totals,
            "totals_per_line": totals_per_line,
            "checks": checks
        })

    @staticmethod
    def get_result_metadata(result_id):
        collection = mongo.db.check_results
        return collection.find_one({"_id": result_id}, {"_id":0})

    def get_data_check_job(self, job_id):
        """Fetches a data cleansing document from job_results collection"""

        job_results = mongo.db.data_check_jobs

        return job_results.find_one({"jobId": job_id})

    def save_check_job(self, job):
        """Saves a data cleansing document in job_results collection"""

        job_results = mongo.db.data_check_jobs

        exist_job = self.get_data_check_job(job["jobId"])
        if exist_job:
            _id = exist_job["_id"]
            job_results.update_one(
                {'_id': _id},
                {'$set': {
                    "jobResult": job["jobResult"],
                    "totalErrors": job["totalErrors"],
                    "totalLocations": job["totalLocations"],
                    "totalRowsInError": job["totalRowsInError"],
                }
                }, upsert=False
            )

        else:
            job["jobResult"] = [job["jobResult"][field] for field in job["jobResult"]]
            job_results.insert_one(job)

        return {"job_id": job["jobId"]}


